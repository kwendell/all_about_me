import React from 'react';


import me from './images/meTransparent.png';
import nato from './images/NATO.png';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
    this.angle = this.props.angle;
    this.r=this.props.r;
 //   console.log(this.r);
  //  console.log(this.angle);
  }
  
  componentDidUpdate() {
    //const {angle} = this.props.angle;
    const canvas = this.canvasRef.current;
     const img = this.imageRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
   //  console.log(this.r);
   // console.log(this.angle);
    
    const r = 200;
    const translate_x=r;
    const translate_y=translate_x;
   // console.log(angle);
    let x = r*Math.cos(this.props.angle);
    let y = r*Math.sin(this.props.angle);
    console.log(x);
    x+=translate_x;
    y+=translate_y;
   ctx.clearRect(x-4, y-4, img.width+8, img.height+8);  
   //   ctx.drawImage(img, x, y);
     

    
   // ctx.beginPath();
   
   // ctx.translate(width/2, height/2 );
   // ctx.rotate(angle * Math.PI / 180);
   // ctx.fillStyle = '#4397AC';
   // ctx.fillRect(-width/4, -height/4, width/2, height/2);
   // ctx.restore();
  }
  
  render() {
    return <div><canvas width="1200" height="600" ref={this.canvasRef} /> <img ref={this.imageRef} src={nato} className="hidden" /></div>;
  }
}

export default Canvas