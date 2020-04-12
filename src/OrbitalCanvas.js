import React, { Component } from 'react'
import me from './images/meTransparent.png';
import Animation from './Animation.js'

class OrbitalCanvas extends Component {
componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const img = this.refs.image
    
     img.onload = () => {
      ctx.drawImage(img, 200, 0)
      ctx.font = "20px Courier"
    
    }
  }

render() {
  return(
      <div>
        <canvas ref="canvas" width="640" height="425" />
        <img ref="image" src={me} className="hidden" />
      </div>
    )
                                            
  }
  
}

export default OrbitalCanvas