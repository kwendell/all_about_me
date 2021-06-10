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
			   <div class="column">  <Animation  ></Animation></div>
			
           </div>
		  
           

        </div>
		<div >
		<span class="work-experience-header">Store Intelligence (May 2005 – Present)</span>
		
		<ul>
		<li>Developed authoring tool for the design of digital signage media.</li>
      
        <li>Conducted customer demos; generated pre-sales artifacts.
        </li>
        <li>Led retailer integration efforts.</li>
        <li>Authored content generation digital signage service; oversaw cloud deployment of content generation service.</li>
        <li>Created and maintained digital signage content for retailers.</li>
        <li>Planned, coordinated product releases.</li>
		<li>Authored user interface specification documents for handheld and desktop devices.</li>
		<li>...a bunch of other stuff....</li>
		</ul>
		
		<span class="work-experience-header">Lightbridge/Altawave, Inc.(July 2000 – March 2005)</span>
		
		<ul>
		<li>Developed application/user interface for AOL Instant Messenger 24 by 7 voice conferencing service (AIM® Voice Conferencing).</li>
        <li>Responded to AIM® Voice Conferencing customer enhancements and modifications requests.</li>
        <li>Followed fixes, enhancements through deployment providing necessary deployment configuration data, and/or documentation.
        </li>
        <li>Storyboarded, designed and developed a Java/Swing Graphical User Interface for application to monitor application and network level alarms within a Network Operations Center.</li>
        <li>Led a team to consensus from use case analysis and u/i storyboarding efforts through the implementation of a web-based conferencing application.</li>
      
      
		</ul>
		
		<span class="work-experience-header">Savi Technology - Sunnyvale, CA (Oct 98 – June 2000)</span>
		
		<ul>
		<li>Developed Graphical User Interfaces for client/server shipping/transportation application.</li>
        <li>Determined requirements, designed in the implementation of a client application.</li>
        <li>Led system test efforts for system deployment.
        </li>
        <li>Supported on-site system installation, demonstration and test.</li>
        <li>Led a team to consensus from use case analysis and u/i storyboarding efforts through the implementation of a web-based conferencing application.</li>
        <li>Performed Business Process Analysis for a web-based client/server system.</li>
    
		</ul>
		
		<span class="work-experience-header">Storm Control Systems (Oct 95 – Oct 98)</span>
		
		<ul>
		<li>Designed, implemented GUI for a distributed client-server product.</li>
        <li>Developed and deployed a real-time application used by the DoD to compute satellite tracking offsets and update trajectories.</li>
        <li>Designed and coded an application to compute spacecraft attitude from telemetered observation data.</li>
        <li>Wrote and implemented system level test plans/procedures for a client-server control system.</li>
     
    
		</ul>
		
		
		</div>

     
      
    </div>
  }
}
export default App;
