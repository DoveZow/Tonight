
import "bootstrap/dist/css/bootstrap.css"
import logo from "../../../images/tonight-logo.svg";
import icon from "../../../images/person-icon.jpg";
import "./NavBar.css"
import DropDown from "./dropDown";



// // class NavBar extends React.Component {
// //     render() { 
// //         return <div id="div">
// //             <nav >
// //                 <ul id="horizontal">
// //                     <li>
// //                     <img className="auth-logo" src={logo} alt="logo" />
// //                     </li>
// //                     <li>
// //                         <a id="li1" href="./About.html">About</a>
// //                     </li>
// //                     <li>
// //                     <a id="li2" href="./TodayView.html">Today's View</a>
// //                     </li>
// //                 </ul>
// //             </nav>
// //         </div>;
// //     }
// // }
 
// // export default NavBar;

import React,{useState} from 'react'

const NavBar = () => {
  const[isDropDown, setIsDropDown] = useState(false);
  return (
    <div id="div">
          <nav >
       <ul id="horizontal">
         <li>
            <img id="logo" className="auth-logo" src={logo} alt="logo" />
        </li>
        <li>
            <a id="li1" href="./about">About</a>
        </li>
        <li>
            <a id="li2" href="./TodayView.html">Today's View</a>
        </li>
        <li>
            <button id="li3" onClick={()=>setIsDropDown(!isDropDown)}><img id="icon" className="auth-logo" src={icon} alt="icon" />(User's Name) </button> 
            <DropDown isDropDown={isDropDown} />
        </li>
            </ul>
           </nav>
           
           
           
          </div>
  
  )
  }
export default NavBar
