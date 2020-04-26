 
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
    this.eccentricity = this.props.eccentricity;
    this.semi_major_axis = this.props.semi_major_axis;
    this.semi_minor_axis = this.props.semi_minor_axis;
    this.p=this.semi_major_axis*(1-this.eccentricity**2);
    console.log(this.area);
    
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
    
    
    if (deltaTime > 15 ) {
    const deltaTheta=.1;
   
   this.setState({angle:this.state.angle+deltaTheta/5});
 
     const newR = this.p/(1-this.props.eccentricity*Math.cos(this.state.angle));
     this.setState({r:newR});
  
  
  
  this.lastTime=currentTime;
  }
    
  
  
    
  }
  
  render() {
    return <Canvas angle={this.state.angle} r={this.state.r} semi_major_axis={this.props.semi_major_axis} semi_minor_axis={this.props.semi_minor_axis} />
  }
}

export default Animation