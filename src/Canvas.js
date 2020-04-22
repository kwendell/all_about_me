import React from 'react';


import me from './images/meTransparent.png';
import nato from './images/NATO.png';
import pencil from './images/pencil.png';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
    this.imageRef2 = React.createRef();
    this.angle = this.props.angle;
    this.r=this.props.r;

  }
  
  componentDidUpdate() {

    const canvas = this.canvasRef.current;
     const img = this.imageRef.current;
     const me = this.imageRef2.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
  
  
  
   // console.log(angle);
    let x = this.props.r*Math.cos(this.props.angle);
    let y = this.props.r*Math.sin(this.props.angle);
   
    x+=canvas.width/2-200;
    y+=canvas.height/2;
   ctx.clearRect(0, 0, 1200, 600);  
     ctx.drawImage(img, x, y);
     ctx.drawImage(me,canvas.width/2,canvas.height/2);
     

    
   // ctx.beginPath();
   
   // ctx.translate(width/2, height/2 );
   // ctx.rotate(angle * Math.PI / 180);
   // ctx.fillStyle = '#4397AC';
   // ctx.fillRect(-width/4, -height/4, width/2, height/2);
   // ctx.restore();
  }
  
  render() {
    return <div><canvas width="1200" height="600" ref={this.canvasRef} /> <img ref={this.imageRef} src={pencil} className="hidden" /><img ref={this.imageRef2} src={me} className="hidden" /></div>;
  }
}

export default Canvas