import React,{Fragment} from 'react'
import "./about.css"
import looking from "../../images/looking.jpg"
const About = () => {
  return (
    <Fragment>
        <h1>
            Tonight
        </h1>
        <body>
            <main>
                <p id="p1">
                <h2>Application Description</h2>

                Tonight is a web application aimed at astrophotographers and casual stargazers alike who wish to view or take pictures of celestial bodies.
                In addition to merely viewing celestial bodies, the catalog can also be used to learn more about their properties, display photographs, 
                or may even include other viewable objects in space such as man-made satellites.
                These features will be useful to students in particular, who can look up details and can get interested in astronomy and astrophysics.
                </p>
                <p id="p2">
                    <h3>
                        Why Tonight?
                    </h3>
                    Currently, almost every website/app providing this service is very technical. 
                    Users need to have previous knowledge about telescopes, mounts and space objects to use them. 
                    As a result, it can be quite difficult for people who are getting started or getting involved on a more casual level. 
                    Many of the simpler applications also do not provide enough detail about the celestial objects themselves, which may hinder user engagement. 
                    Our vision is to make a more intuitive version of these services which does not require any previous experience, while maintaining power and functionality.
                    <img id="looking" src={looking} alt="looking"/>
                </p>
                <p id="p3">
                    <h4>
                        What Can You Do?
                    </h4>
                    Upon entering the application the user will be asked to log into their account or make a new account if no account available. Then the user will be directed to the home page.
                    There the user can search for any celestrial objects, more advanced users will be able to query specific objects using provided filters, such as type and visible distances 
                    including naked eye and telescope. Users can also view a history page which will allow them to retrieve recently viewed objects or add their favorite objects if they want to keep track of to a bookmarks section.
                    The system will suggest the more easily viewable and brightest objects by default and feature a “picture of the day” to engage new users.
                </p>
            </main>
            <footer>
                Made by Matthew Jhao, Eric Coscolluela, Abhay Dhiman, Khandaker Shahriar Rahman
            </footer>
        </body>
    </Fragment>
  )
}

export default About
