import React from 'react';
import me from './images/meTransparent.png';
import './App.css';
import Animation from './Animation.js'
import Background from './images/graph_paper.png';

var sectionStyle = {
 width: "100%",
  height: "100%",
 backgroundImage: `url(${Background})`
};

var headerStyle = {
 width: "100%",
  height: "33%",

};

 
 
class App extends React.Component {
  render() {
  
  
    return <div style={sectionStyle}>
         <div stlye={headerStyle}>
 
          <h1 className="App">
          Kevin W. Duell
        </h1>
         <h1 className="App">
          email: kdubzot9@gmail.com
        </h1>
          <h1 className="App">
          U/I Architect
        </h1>
        </div>
     
      <Animation semi_major_axis={100} semi_minor_axis={25} eccentricity={.5} fraction={.01}  ellipseParms={{a:100}}></Animation>
      <div>Projects</div>
    </div>
  }
}
export default App;
