import React from 'react';

import Background from './images/paper_half_lines.png';
import me from './images/meTransparent.png';

var sectionStyle = {
 width: "25%",
  height: "25%",
 backgroundImage: `url(${Background})`
};
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
  }
  
  componentDidUpdate() {
    const {angle} = this.props;
    const canvas = this.canvasRef.current;
     const img = this.imageRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const nowAngle = angle ;
    ctx.clearRect(nowAngle, 0, img.width, img.height);  
      ctx.drawImage(img, angle, 0)
     
    
    
   // ctx.beginPath();
   
   // ctx.translate(width/2, height/2 );
   // ctx.rotate(angle * Math.PI / 180);
   // ctx.fillStyle = '#4397AC';
   // ctx.fillRect(-width/4, -height/4, width/2, height/2);
   // ctx.restore();
  }
  
  render() {
    return <div><canvas width="600" height="300" ref={this.canvasRef} /> <img ref={this.imageRef} src={me} className="hidden" /></div>;
  }
}

export default Canvas