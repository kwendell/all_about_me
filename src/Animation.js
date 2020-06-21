
import React from 'react';

import me from './images/meTransparent.png';
import nato from './images/NATO.png';
import pencil from './images/pencil.png';
class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.rotationMatrices = [];
     this.canvasRef = React.createRef();
    this.natoRef = React.createRef();
    this.meRef = React.createRef();
    this.pencilRef = React.createRef();
    this.ellipseParms = [{semi_major_axis:100,eccentricity:.9,reference:null,deltaTheta:.01,rotation_x:0,rotation_y:0,rotation_z:0},
      {semi_major_axis:100,eccentricity:.9,reference:null,deltaTheta:.02,rotation_x:0,rotation_y:0,rotation_z:0}];

    this.computeRotation();
    this.state = {
      list: [{angle: 0, r:100},{angle: 0, r:100}],
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
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const me = this.meRef.current;
    var position = new Array(3);
    var x = new Array(2);
    var y = new Array(2);
    var z = new Array(2);
    const rotated = [[],[]];
    for (let i=0;i<this.ellipseParms.length;i++) {
      if (deltaTime > 2 ) {

        const deltaTheta=this.ellipseParms[i].deltaTheta;
        elementClone[i].angle=deltaTheta+elementClone[i].angle ;
        const p=this.ellipseParms[i].semi_major_axis*(1-this.ellipseParms[i].eccentricity**2);
        elementClone[i].r= p/(1-this.ellipseParms[i].eccentricity*Math.cos(elementClone[i].angle));
        this.lastTime=currentTime;

        canvas.width = window.innerWidth;

        x[i] = elementClone[i].r*Math.cos(elementClone[i].angle);
        y[i] = elementClone[i].r*Math.sin(elementClone[i].angle);
        z[i] = 0;
        // Rotate the coordinates
        rotated[i] = this.rotate(x[i],y[i],z[i],this.rotationMatrices[i]);

      }
      ctx.drawImage(this.ellipseParms[0].reference,x[0]+canvas.width/2 -this.ellipseParms[0].semi_major_axis , y[0]+canvas.height/2-me.height/2);
      ctx.drawImage(this.ellipseParms[1].reference,x[1]+canvas.width/2 -this.ellipseParms[1].semi_major_axis, y[1]+canvas.height/2-me.height/2);
      ctx.drawImage(me,canvas.width/2-me.width/2,canvas.height/2-me.height/2);


//this.setState({list:elementClone})


  }




  }

    render() {
    return <div><canvas width="1000" height="290"  ref={this.canvasRef} >
    <img ref={this.natoRef} src={nato} className="hidden" alt="NATO"/>
    <img ref={this.pencilRef} src={pencil} className="hidden"  alt="pencil"/>
    <img ref={this.meRef} src={me} className="hidden" alt="just me" />
    </canvas>

    </div>;
  }
}

export default Animation
