import React from 'react';


import me from './images/meTransparent.png';
import nato from './images/NATO.png';
import pencil from './images/pencil.png';
import projects from './images/meProjects.png';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
    this.imageRef2 = React.createRef();
    this.angle = this.props.angle;
    this.r=this.props.r;
    this.semi_major_axis = this.props.semi_major_axis;
     this.semi_minor_axis = this.props.semi_minor_axis;
    

  }
  
  componentDidUpdate() {

    const canvas = this.canvasRef.current;
     const img = this.imageRef.current;
     const me = this.imageRef2.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
   // console.log(angle);`
    let x = this.props.r*Math.cos(this.props.angle);
       console.log(x);
    let y = this.props.r*Math.sin(this.props.angle);
  
  
 

  
    y+=canvas.height/4;
   ctx.clearRect(0, 0, canvas.width, canvas.height);
 
     ctx.drawImage(img,x+200 , y);
  

     ctx.drawImage(me,canvas.width/2-me.width/2,0);

     

    
   
  }
  
  render() {
    return <div><canvas width="1000" height="290"  ref={this.canvasRef} > 
    <img ref={this.imageRef} src={pencil} className="hidden" />
    <img ref={this.imageRef2} src={me} className="hidden" />
    </canvas>
   
    </div>;
  }
}

export default Canvas