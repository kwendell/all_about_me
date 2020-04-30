import React from 'react';


import me from './images/meTransparent.png';
import nato from './images/NATO.png';
import pencil from './images/pencil.png';
//import projects from './images/meProjects.png';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
  
    this.canvasRef = React.createRef();
    this.natoRef = React.createRef();
    this.imageRef2 = React.createRef();
    
 
    this.semi_major_axis = 100;
     this.semi_minor_axis = 25;
     this.c = Math.sqrt(this.semi_major_axis**2-this.semi_minor_axis**2);
     this.NATO=0;
     this.item_path=this.props.item_path;
     console.log(this.props.item_path);
     

  }
  
  componentDidUpdate() {

    const canvas = this.canvasRef.current;
     const img = this.natoRef.current;
     console.log(img.getAttribute("src"));
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
    <img ref={this.natoRef} src={nato} className="hidden" />
    <img ref={this.imageRef2} src={me} className="hidden" />
    </canvas>
   
    </div>;
  }
}

export default Canvas