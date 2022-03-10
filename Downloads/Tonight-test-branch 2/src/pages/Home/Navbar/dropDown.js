import React from 'react'
import "./dropdown.css"
const DropDown = ({isDropDown}) => {
    if(isDropDown===false){
        return null;
    }
  return (
    <div>
        <ul id="div1">
            <li id="dli1">
                <a href="#">
                    Favourites List
                </a>
                </li><br/>
            <li id="dli1">
                <a href="#">
                    Searches
                </a><br/>
                </li>
            <li id="dli2">
                <span id="p">
                <a href="#">
                    Log Out
                </a>
                </span>
                </li>
        </ul>
    </div>
  )
}

export default DropDown
