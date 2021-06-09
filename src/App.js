import React from 'react';

import './App.css';
import Animation from './Animation.js'
import Background from './images/graph_paper.png';
import sticky from './images/profile-on-sticky.png';
import projects from './images/meProjects.png';

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
         <div style={headerStyle}>
           <div class="row">
             <div class="sticky">
			  <img src={sticky} alt="sticky" />
            
             </div>
             <div class="column">
                        <h1 className="App">Kevin W. Duell</h1>
             <h1 className="App">email: kdubzot9@gmail.com</h1>
             <h1 className="App">Role:  U/I Architect</h1>
             <h1 className="App">Phone:  (408) 234-7820</h1> 
			   <h1 className="App">Github:  kwendell</h1> 
            </div>
			   <div class="column">  <Animation ></Animation></div>
			
           </div>
		  
           

        </div>
		<div >
		<span class="work-experience-header">Work Experience</span>
		
		<ul>
		<li>Developed desktop authoring tool for the design of digital signage media.
</li>
<li>Authored user interface specification documents for both handheld and desktop devices.</li>
<li>Conducted Customer demos; generated pre-sales artifacts.
</li>
<li>Led retailer integration efforts through successful release.</li>
<li>Developed and deployed content service for digital signage application; oversaw cloud deployment of content generation service.</li>
		</ul>
		
		</div>

     
      
    </div>
  }
}
export default App;
