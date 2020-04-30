 
import React from 'react';
import Canvas from './Canvas.js'
class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.ellipseParms = [{semi_major_axis:100,eccentricity:.5,item_path:"./images/NATO.png"}];
   this.state = { angle: 0, r:100 };
  
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
 
    this.rAF = requestAnimationFrame(this.updateAnimationState);
    const currentTime = new Date();
    const deltaTime = currentTime-this.lastTime;
   
    
    if (deltaTime > 15 ) {
      const deltaTheta=.1;
   
      this.setState({angle:this.state.angle+deltaTheta/5});
 
      const newR = this.p/(1-this.eccentricity*Math.cos(this.state.angle));
      this.setState({r:newR});
  
      this.lastTime=currentTime;
  }
    
  
  
    
  }
  
  render() {
    return <Canvas angle={this.state.angle} r={this.state.r} item_path={this.ellipseParms[0].item_path} semi_major_axis={this.ellipseParms[0].semi_major_axis} eccentricity={this.ellipseParms[0].eccentricity} />
  }
}

export default Animation