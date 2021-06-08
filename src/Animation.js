
import React from 'react';

import me from './images/meTransparent.png';
import nato from './images/NATO.png';
import pencil from './images/pencil.png';
import java from './images/java.png';
class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.rotationMatrices = [];
	
    this.canvasRef = React.createRef();
    this.natoRef = React.createRef();
	this.refs = [];
	this.refs[0]=React.createRef();
	
    this.meRef = React.createRef();
    this.pencilRef = React.createRef();
	this.javaRef = React.createRef();
	
    this.ellipseParms = [{semi_major_axis:70,eccentricity:.3,reference:null,deltaTheta:.015,rotation_x:30*(Math.PI/180),rotation_y:0*(Math.PI/180),rotation_z:90*(Math.PI/180)},
                          {semi_major_axis:100,eccentricity:.7,reference:null,deltaTheta:.02,rotation_x:0,rotation_y:0,rotation_z:0},
						  {semi_major_axis:50,eccentricity:.001,reference:null,deltaTheta:.01,rotation_x:0,rotation_y:0,rotation_z:0}];
    const k = 7.407e-3;
    this.ellipseParms[0].deltaTheta=1/(Math.sqrt(k*this.ellipseParms[0].semi_major_axis**3));
    this.ellipseParms[1].deltaTheta=1/(Math.sqrt(k*this.ellipseParms[1].semi_major_axis**3));
	this.ellipseParms[2].deltaTheta=1/(Math.sqrt(k*this.ellipseParms[2].semi_major_axis**3));
    this.computeRotation();
    this.state = {
      list: [{angle: 180, r:100},{angle: 0, r:100},{angle: 90, r:100}],
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
    this.ellipseParms[1].reference = this.pencilRef.current;
	this.ellipseParms[2].reference = this.javaRef.current;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const me = this.meRef.current;
    //const pencil = this.pencilRef.current;
   // const nato = this.natoRef.current;
	// const java = this.javaRef.current;
 
    var x = new Array(3);
    var y = new Array(3);
    var z = new Array(3);
    const rotated = [[],[],[]];
	const originalWidth = [];
	const originalHeight = [];
	
	originalWidth[0]= this.ellipseParms[0].reference.width;
	originalHeight [0] = this.ellipseParms[0].reference.height;
	originalWidth[1] = this.ellipseParms[1].reference.width;
	originalHeight[1] = this.ellipseParms[1].reference.height;
	originalWidth[2] = this.ellipseParms[2].reference.width;
	originalHeight[2] = this.ellipseParms[2].reference.height;
	
    for (let i=0;i<this.ellipseParms.length;i++) {
      if (deltaTime > 1 ) {

        const deltaTheta=this.ellipseParms[i].deltaTheta;
        elementClone[i].angle=deltaTheta+elementClone[i].angle ;
        const p=this.ellipseParms[i].semi_major_axis*(1-this.ellipseParms[i].eccentricity**2);
        elementClone[i].r= p/(1-this.ellipseParms[i].eccentricity*Math.cos(elementClone[i].angle));
        this.lastTime=currentTime;

       canvas.width = window.innerWidth;
       
      //  canvas.height = 240;

        x[i] = elementClone[i].r*Math.cos(elementClone[i].angle);
        y[i] = elementClone[i].r*Math.sin(elementClone[i].angle);
        z[i] = 0;

      
        // Rotate the coordinates
        rotated[i] = this.rotate(x[i],y[i],z[i],this.rotationMatrices[i]);
		
		//console.log(rotated[i][2] );

      }
	}

      const semi_minor_axis = new Array(3);
      const foci = new Array(2);
	  const xOffsets = new Array(3);
	  const yOffsets = new Array(3);
	  const incrementalScales = new Array(this.ellipseParms.length);

      semi_minor_axis[0]=this.ellipseParms[0].semi_major_axis*Math.sqrt((1-this.ellipseParms[0].eccentricity**2));
      semi_minor_axis[1]=this.ellipseParms[1].semi_major_axis*Math.sqrt((1-this.ellipseParms[1].eccentricity**2));
	  semi_minor_axis[2]=this.ellipseParms[2].semi_major_axis*Math.sqrt((1-this.ellipseParms[2].eccentricity**2));

      foci[0]=Math.sqrt(this.ellipseParms[0].semi_major_axis**2 - semi_minor_axis[0]**2);
      foci[1]=Math.sqrt(this.ellipseParms[1].semi_major_axis**2 - semi_minor_axis[1]**2);
	  foci[2]=Math.sqrt(this.ellipseParms[2].semi_major_axis**2 - semi_minor_axis[2]**2);
	  
	  
	  xOffsets[0] = canvas.width/2 - 2*foci[0]*Math.cos(this.ellipseParms[0].rotation_z) ;
	  yOffsets[0] = canvas.height/2 - 2*foci[0]*Math.sin(this.ellipseParms[0].rotation_z)  ;
	  incrementalScales[0] = rotated[0][2]/(canvas.width/4)+1;

      ctx.drawImage(this.ellipseParms[0].reference,
        rotated[0][0]+xOffsets[0]- this.ellipseParms[0].reference.width/2,
        rotated[0][1]+yOffsets[0]- this.ellipseParms[0].reference.height/2,incrementalScales[0]*originalWidth[0],incrementalScales[0]*originalHeight[0]);
		
	
      
	  xOffsets[1] = canvas.width/2 - 2*foci[1]*Math.cos(this.ellipseParms[1].rotation_z) ;
	  yOffsets[1] = canvas.height/2 - 2*foci[1]*Math.sin(this.ellipseParms[1].rotation_z)  ;
	  incrementalScales[1] = rotated[1][2]/(canvas.width/4)+1;
	  
	  ctx.drawImage(this.ellipseParms[1].reference,
      rotated[1][0]+xOffsets[1]- this.ellipseParms[1].reference.width/2,
      rotated[1][1]+yOffsets[1]- this.ellipseParms[1].reference.height/2,incrementalScales[1]*originalWidth[1],incrementalScales[1]*originalHeight[1]);
		
	  xOffsets[2] = canvas.width/2 - 2*foci[2]*Math.cos(this.ellipseParms[2].rotation_z) ;
	  yOffsets[2] = canvas.height/2 - 2*foci[2]*Math.sin(this.ellipseParms[2].rotation_z)  ;
	  incrementalScales[2] = rotated[2][2]/(canvas.width/4)+1;
	  
//	    ctx.drawImage(this.ellipseParms[2].reference,
 //       rotated[2][0]+xOffsets[1]- this.ellipseParms[2].reference.width/2,
  //      rotated[2][1]+yOffsets[1]- this.ellipseParms[2].reference.height/2,incrementalScales[2]*originalWidth[2],incrementalScales[2]*originalHeight[2]);
      
	  //ctx.drawImage(this.ellipseParms[1].reference,
       // rotated[1][0]+canvas.width/2  - pencil.width/2 - 2*foci[1],
       // rotated[1][1]+canvas.height/2 - pencil.height/2);
		
	  ctx.drawImage(this.ellipseParms[2].reference,
      rotated[2][0]+canvas.width/2-this.ellipseParms[2].reference.width/2,
      rotated[2][1]+canvas.height/2-this.ellipseParms[2].reference.height/2,incrementalScales[2]*originalWidth[2],incrementalScales[2]*originalHeight[2]);
	  
//console.log(incrementalScales[2]);
		
	
      ctx.drawImage(me,canvas.width/2-me.width/2,canvas.height/2-me.height/2);


//this.setState({list:elementClone})


  }




  

    render() {
    return <div><canvas  height="300"  ref={this.canvasRef} class="dotted" >

    <img ref={this.natoRef} src={nato} className="hidden" alt="NATO"/>
    <img ref={this.pencilRef} src={pencil} className="hidden"  alt="pencil"/>
	<img ref={this.javaRef} src={java} className="hidden" alt="JAVA"/>
    <img ref={this.meRef} src={me} className="hidden" alt="just me" />
    </canvas>

    </div>;
  }
}

export default Animation
