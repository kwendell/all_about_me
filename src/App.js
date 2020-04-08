import React from 'react';
import me from './images/meTransparent.png';
import './App.css';
import OrbitalCanvas from './OrbitalCanvas.js'


import Background from './images/paper_half_lines.png';

var sectionStyle = {
 width: "100%",
  height: "200px",
 backgroundImage: `url(${Background})`
};
 
function App() {
  return (
    <div class="App" style={ sectionStyle }>
      <h1>
          It's All About Me
        </h1>
          
       
         <OrbitalCanvas/>
        
          
         
    
     
    </div>
  );
}

export default App;
