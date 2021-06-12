
import React from 'react';

import me from './images/meTransparent.png';
import nato from './images/NATO.png';
import html_canvas from './images/html_canvas.bmp';
import java from './images/java.png';
import ui_dev from './images/ui_dev.png';
class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.rotationMatrices = [];
	
    this.canvasRef = React.createRef();
    this.natoRef = React.createRef();
	this.refs = [];
	this.refs[0]=React.createRef();
	
    this.meRef = React.createRef();
    this.html_canvasRef = React.createRef();
	this.javaRef = React.createRef();
	this.ui_devRef = React.createRef();
	
    this.ellipseParms = [{semi_major_axis:70,eccentricity:.3,reference:null,deltaTheta:.015,rotation_x:30*(Math.PI/180),rotation_y:0*(Math.PI/180),rotation_z:90*(Math.PI/180)},
                          {semi_major_axis:90,eccentricity:.05,reference:null,deltaTheta:.02,rotation_x:0,rotation_y:0,rotation_z:15*(Math.PI/180)},
						  {semi_major_axis:50,eccentricity:.001,reference:null,deltaTheta:.01,rotation_x:0,rotation_y:0,rotation_z:0},
					      {semi_major_axis:50,eccentricity:.5,reference:null,deltaTheta:.01,rotation_x:0,rotation_y:30*(Math.PI/180),rotation_z:0}];
    const k = 7.407e-3;
    this.ellipseParms[0].deltaTheta=1/(Math.sqrt(k*this.ellipseParms[0].semi_major_axis**3));
    this.ellipseParms[1].deltaTheta=1/(Math.sqrt(k*this.ellipseParms[1].semi_major_axis**3));
	this.ellipseParms[2].deltaTheta=1/(Math.sqrt(k*this.ellipseParms[2].semi_major_axis**3));
	this.ellipseParms[3].deltaTheta=1/(Math.sqrt(k*this.ellipseParms[3].semi_major_axis**3));
    this.computeRotation();
    this.state = {
      list: [{angle: 180, r:100},{angle: 0, r:100},{angle: 90, r:100},{angle: 270, r:100}],
    };


    this.item_path=this.ellipseParms.item_path;
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.rotate = this.rotate.bind(this);
    this.computeRotation = this.computeRotation.bind(this);

    this.lastTime=new Date();

  }
  computeRotation() {


    for (const element of this.ellipseParms) {

// set up the rotations

    let R = [
    [ Math.cos(element.rotation_z)*Math.cos(element.rotation_y),
      Math.cos(element.rotation_z)*Math.sin(element.rotation_y)*Math.sin(element.rotation_x)-Math.sin(element.rotation_z)*Math.cos(element.rotation_x),
      Math.cos(element.rotation_z)*Math.sin(element.rotation_y)*Math.cos(element.rotation_x)+Math.sin(element.rotation_z)*Math.sin(element.rotation_y)],
    [ Math.sin(element.rotation_z)*Math.cos(element.rotation_y),
      Math.sin(element.rotation_z)*Math.sin(element.rotation_y)*Math.sin(element.rotation_z)+Math.cos(element.rotation_z)*Math.cos(element.rotation_x),
      Math.sin(element.rotation_z)*Math.sin(element.rotation_y)*Math.cos(element.rotation_x)-Math.cos(element.rotation_z)*Math.sin(element.rotation_y)],
    [-Math.sin(element.rotation_y),
      Math.cos(element.rotation_y)*Math.sin(element.rotation_x),
      Math.cos(element.rotation_y)*Math.cos(element.rotation_x)]
    ];
    this.rotationMatrices.push(R);

    }



  }

  rotate(x,y,z,rotationMatrix) {
      const position = [x,y,z];
      let position_rotated = [0,0,0];

         for (let row=0;row<position.length;row++)  {
           for (let col=0;col<rotationMatrix[row].length;col++)  {
             position_rotated[row]+=rotationMatrix[row][col]*position[col];
           }
         }
    //  console.log(position_rotated[0]+", "+position_rotated[1]+", "+position_rotated[2]);
    return position_rotated;
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
    //this.setState({r:this.ellipseParms[0].semi_major_axis});
//    this.setState({angle:0});
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  updateAnimationState() {

    // find the next theta by solution for delta theta.

    let elementClone = [...this.state.list];


    this.rAF = requestAnimationFrame(this.updateAnimationState);
    const currentTime = new Date();
    const deltaTime = currentTime-this.lastTime;

    this.ellipseParms[0].reference = this.natoRef.current;
    this.ellipseParms[1].reference = this.html_canvasRef.current;
	this.ellipseParms[2].reference = this.javaRef.current;
	this.ellipseParms[3].reference = this.ui_devRef.current;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const me = this.meRef.current;
  
 
    var x = new Array(4);
    var y = new Array(4);
    var z = new Array(4);
    const rotated = [[],[],[]];

	
	
	
	
    for (let i=0;i<this.ellipseParms.length;i++) {
      if (deltaTime > 1 ) {

        const deltaTheta=this.ellipseParms[i].deltaTheta;
        elementClone[i].angle=deltaTheta+elementClone[i].angle ;
        const p=this.ellipseParms[i].semi_major_axis*(1-this.ellipseParms[i].eccentricity**2);
        elementClone[i].r= p/(1-this.ellipseParms[i].eccentricity*Math.cos(elementClone[i].angle));
        this.lastTime=currentTime;

       canvas.width = window.innerWidth/3.00;
       
      //  canvas.height = 240;

        x[i] = elementClone[i].r*Math.cos(elementClone[i].angle);
        y[i] = elementClone[i].r*Math.sin(elementClone[i].angle);
        z[i] = 0;

      
        // Rotate the coordinates
        rotated[i] = this.rotate(x[i],y[i],z[i],this.rotationMatrices[i]);
		this.ellipseParms[i].zCoord=rotated[i][2];
		this.ellipseParms[i].xCoord=rotated[i][0];
		this.ellipseParms[i].yCoord=rotated[i][1];
		
		//console.log(rotated[i][2] );

      }
	}

	

	
	
	//this.ellipseParms.sort((a, b) => (a.zCoord > b.zCoord) ? 1 : -1);
	
	const originalWidth = [];
	const originalHeight = [];
	
	this.ellipseParms[0].originalWidth=this.ellipseParms[0].reference.width;
	this.ellipseParms[0].originalHeight=this.ellipseParms[0].reference.height;
	this.ellipseParms[1].originalWidth=this.ellipseParms[1].reference.width;
	this.ellipseParms[1].originalHeight=this.ellipseParms[1].reference.height;
	this.ellipseParms[2].originalWidth=this.ellipseParms[2].reference.width;
	this.ellipseParms[2].originalHeight=this.ellipseParms[2].reference.height;
	this.ellipseParms[3].originalWidth=this.ellipseParms[3].reference.width;
	this.ellipseParms[3].originalHeight=this.ellipseParms[3].reference.height;
	
	//this.ellipseParms.sort((a, b) => (a.zCoord >= b.zCoord) ? 1 : -1);
	
	  
	  for (var k=0;k<this.ellipseParms.length;k++) {
		
		   var semi_minor_axis=this.ellipseParms[k].semi_major_axis*Math.sqrt((1-this.ellipseParms[k].eccentricity**2));
		   var foci=Math.sqrt(this.ellipseParms[k].semi_major_axis**2 - semi_minor_axis**2);
		   var xOffset = canvas.width/2 - 2*foci*Math.cos(this.ellipseParms[k].rotation_z) ;
	       var yOffset = canvas.height/2 - 2*foci*Math.sin(this.ellipseParms[k].rotation_z)  ;
		   if ( this.ellipseParms[k].zCoord!=null)  {
	         var incrementalScale = this.ellipseParms[k].zCoord/(canvas.width/4)+1;
		   
		     ctx.drawImage(this.ellipseParms[k].reference,
             this.ellipseParms[k].xCoord+xOffset- this.ellipseParms[k].reference.width/2,
             this.ellipseParms[k].yCoord+yOffset-this.ellipseParms[k].reference.height/2,incrementalScale*this.ellipseParms[k].originalWidth,incrementalScale*this.ellipseParms[k].originalHeight);
		   }
	  }

    
	  
	


		
	
      ctx.drawImage(me,canvas.width/2-me.width/2,canvas.height/2-me.height/2);


//this.setState({list:elementClone})


  }




  

    render() {
    return <div><canvas  height="250"  ref={this.canvasRef}  >

    <img ref={this.natoRef} src={nato} className="hidden" alt="NATO"/>
    <img ref={this.html_canvasRef} src={html_canvas} className="hidden"  alt="html-canvas"/>
	<img ref={this.javaRef} src={java} className="hidden" alt="JAVA"/>
	<img ref={this.ui_devRef} src={ui_dev} className="hidden" alt="UI Dev"/>
    <img ref={this.meRef} src={me} className="hidden" alt="just me" />
    </canvas>

    </div>;
  }
}

export default Animation
