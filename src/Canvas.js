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
     this.c = Math.sqrt(this.semi_major_axis**2-this.semi_minor_axis**2);
    

  }
  
  componentDidUpdate() {

    const canvas = this.canvasRef.current;
     const img = this.imageRef.current;
     const me = this.imageRef2.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
   
    let x = this.props.r*Math.cos(this.props.angle);
       let y = this.props.r*Math.sin(this.props.angle);
  
   
   ctx.clearRect(0, 0, canvas.width, canvas.height);
 
     ctx.drawImage(img,x+canvas.width/2-this.c , y+canvas.height/2-me.height/2);
  

     ctx.drawImage(me,canvas.width/2-me.width/2,canvas.height/2-me.height/2);

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