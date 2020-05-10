
import React from 'react';
import Canvas from './Canvas.js'
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
    this.ellipseParms = [{semi_major_axis:100,eccentricity:.5,reference:null,deltaTheta:.05},{semi_major_axis:200,eccentricity:.7,reference:null,deltaTheta:.02}];
    //this.ellipseParms[0].reference=this.natoRef;


    this.state = {
      list: [{angle: 0, r:100},{angle: 0, r:100}],
    };

    this.item_path=this.ellipseParms.item_path;


    this.updateAnimationState = this.updateAnimationState.bind(this);

    this.eccentricity = .5;


    this.p=this.state.r*(1-this.eccentricity**2);

    this.lastTime=new Date();

  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
    this.setState({r:this.ellipseParms[0].semi_major_axis});
    this.setState({angle:0});
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  updateAnimationState() {

    // find the next theta by solution for delta theta.

    let elementClone = [...this.state.list];
  //  playersClone[activePlayer].cards = [
  //      ...playersClone[activePlayer].cards,
  //      openedCard
  //  ];

    this.rAF = requestAnimationFrame(this.updateAnimationState);
    const currentTime = new Date();
    const deltaTime = currentTime-this.lastTime;

    this.ellipseParms[1].reference = this.natoRef.current;
    this.ellipseParms[0].reference = this.pencilRef.current;
     const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      //ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0;i<this.ellipseParms.length;i++) {
    if (deltaTime > 15 ) {
      const deltaTheta=this.ellipseParms[i].deltaTheta;
      elementClone[i].angle=deltaTheta+elementClone[i].angle;

      const newR = this.p/(1-this.ellipseParms[i].eccentricity*Math.cos(this.state.angle));
      elementClone[i].r=newR;
      //elementClone.
     // this.setState({r:newR});

    //  this.setState(newR) => {currentElement.r=newR});


      this.lastTime=currentTime;

      // Get the contexts




      const me = this.meRef.current;

      canvas.width = window.innerWidth;

      const x = this.state.r*Math.cos(this.state.angle);
      const y = this.state.r*Math.sin(this.state.angle);

      const semi_minor_axis = this.ellipseParms[i].semi_major_axis*this.ellipseParms[i].eccentricity;


      const c = Math.sqrt(this.ellipseParms[i].semi_major_axis**2-semi_minor_axis**2);




      ctx.drawImage(this.ellipseParms[i].reference,x+canvas.width/2-c , y+canvas.height/2-me.height/2);
      ctx.drawImage(me,canvas.width/2-me.width/2,canvas.height/2-me.height/2);
      }


  }




  }

    render() {
    return <div><canvas width="1000" height="290"  ref={this.canvasRef} >
    <img ref={this.natoRef} src={nato} className="hidden" />
    <img ref={this.pencilRef} src={pencil} className="hidden" />
    <img ref={this.meRef} src={me} className="hidden" />
    </canvas>

    </div>;
  }
}

export default Animation
