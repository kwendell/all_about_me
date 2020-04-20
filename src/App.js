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

 
 
class App extends React.Component {
  render() {
  
  
    return <div style={sectionStyle}>
    <div>
  
          <h1 className="App">
          Kevin W. Duell
        </h1>
         <h2 className="App">
          email: kdubzot9@gmail.com
        </h2>
        </div>
      <Animation semi_major_axis={200} semi_minor_axis={100} eccentricity={.5} fraction={.005} ></Animation>
    </div>;
  }
}
export default App;
