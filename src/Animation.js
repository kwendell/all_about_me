 
import React from 'react';
import Canvas from './Canvas.js'
class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0, r:200 };
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.area=Math.PI*this.props.semi_major_axis*this.props.semi_minor_axis;
    this.fractionalArea=this.area*this.props.fraction;
    this.lastTime=new Date();
  }
  
  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  
  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }
  
  updateAnimationState() {
 
    // find the next theta by solution for delta theta.
  //  let deltaTheta = 2*this.fractionalArea*Math.PI*((1-Math.cos(this.state.angle)/2)/150)**2;
    this.rAF = requestAnimationFrame(this.updateAnimationState);
    const currentTime = new Date();
    const deltaTime = currentTime-this.lastTime;
    
    if (deltaTime > 100 ) {
    const deltaTheta=.1;
   //  this.setState(prevState => ({ angle: (prevState.angle + deltaTheta) % 2*Math.PI }));
   this.setState({angle:this.state.angle+deltaTheta});
     console.log(this.state.angle);
     const newR = 150/(1-Math.cos(this.state.angle)/2);
     this.setState({r:newR});
   // this.setState(prevR => ({r:150/(1-Math.cos(this.state.angle)/2)}));
    
    console.log(this.state.r);
  this.lastTime=currentTime;
  }
    
  
  
    
  }
  
  render() {
    return <Canvas angle={this.state.angle} r={this.state.r} />
  }
}

export default Animation