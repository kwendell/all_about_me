 
import React from 'react';
import Canvas from './Canvas.js'
class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0, r:200 };
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.area=Math.PI*this.props.semi_major_axis*this.props.semi_minor_axis;
    this.fractionalArea=this.area*this.props.fraction;
  }
  
  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  
  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }
  
  updateAnimationState() {
  //  this.setState(prevState => ({ angle: prevState.angle + 1 }));
    // find the next theta by solution for delta theta.
    const deltaTheta = 2*this.fractionalArea*Math.PI*((1-Math.cos(this.state.angle)/2)/150)**2;
      this.rAF = requestAnimationFrame(this.updateAnimationState);
    this.setState(prevState => ({angle:prevState.angle+deltaTheta }));
  //  console.log(this.state.angle % 2*Math.PI);
    
   // const current_r = 150/(1-Math.cos(this.state.angle % 2*Math.PI)/2);
    this.setState(prevR => ({r:150/(1-Math.cos(this.state.angle % 2*Math.PI)/2)}));
  
    //this.setState(({angle: newAngle });
    this.setState(prevState => ({ angle: (prevState.angle + deltaTheta) % 2*Math.PI }));
 //   this.setState(prevR  
//   console.log(this.state.r);
    
  }
  
  render() {
    return <Canvas angle={this.state.angle} r={this.state.r} />
  }
}

export default Animation