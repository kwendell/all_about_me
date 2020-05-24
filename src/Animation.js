
import React from 'react';

import me from './images/meTransparent.png';
import nato from './images/NATO.png';
import pencil from './images/pencil.png';
class Animation extends React.Component {
  constructor(props) {
    super(props);

     this.canvasRef = React.createRef();
    this.natoRef = React.createRef();
    this.meRef = React.createRef();
    this.pencilRef = React.createRef();
    this.ellipseParms = [{semi_major_axis:100,eccentricity:.5,reference:null,deltaTheta:.01,rotation_x:Math.PI/4,rotation_y:0,rotation_z:0},
      {semi_major_axis:400,eccentricity:.7,reference:null,deltaTheta:.03,rotation_x:0,rotation_y:0,rotation_z:Math.PI/2}];

    this.computeRotation();
    this.state = {
      list: [{angle: 0, r:100},{angle: 20, r:100}],
    };


    this.item_path=this.ellipseParms.item_path;
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.computeRotation = this.computeRotation.bind(this);

    this.lastTime=new Date();

  }
  computeRotation() {
    console.log("computeRotation");
    for (const element of this.ellipseParms) {
      console.log(element.rotation_x);
      console.log(element.rotation_y);
      console.log(element.rotation_z);
      console.log("-----");
    }
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
    this.setState({r:this.ellipseParms[0].semi_major_axis});
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
    var x = new Array(2);
    var y = new Array(2);
    for (let i=0;i<this.ellipseParms.length;i++) {
      if (deltaTime > 5 ) {

        const deltaTheta=this.ellipseParms[i].deltaTheta;
        elementClone[i].angle=deltaTheta+elementClone[i].angle ;
        const p=this.ellipseParms[i].semi_major_axis*(1-this.ellipseParms[i].eccentricity**2);
        const newR = p/(1-this.ellipseParms[i].eccentricity*Math.cos(elementClone[i].angle));

        elementClone[i].r=newR;
        this.lastTime=currentTime;

        canvas.width = window.innerWidth;

        x[i] = this.state.r*Math.cos(this.state.list[i].angle);
        y[i] = this.state.r*Math.sin(this.state.list[i].angle);

        const semi_minor_axis = this.ellipseParms[i].semi_major_axis*this.ellipseParms[i].eccentricity;
      //  const c = Math.sqrt(this.ellipseParms[i].semi_major_axis**2-semi_minor_axis**2);
      //  console.log(x[i]);


      }
      ctx.drawImage(this.ellipseParms[0].reference,x[0]+canvas.width/2 , y[0]+canvas.height/2-me.height/2);
        ctx.drawImage(this.ellipseParms[1].reference,x[1]+canvas.width/2 , y[1]+canvas.height/2-me.height/2);
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
