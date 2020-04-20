import React from 'react';
import me from './images/meTransparent.png';
import './App.css';
import Animation from './Animation.js'
import Background from './images/paper_half_lines.png';

var sectionStyle = {
 width: "100%",
  height: "100%",
 backgroundImage: `url(${Background})`
};

 
 
class App extends React.Component {
  render() {
    return <div style={sectionStyle}>
      <Animation semi_major_axis={200} semi_minor_axis={100} eccentricity={.5} fraction={.01} ></Animation>
    </div>;
  }
}
export default App;
