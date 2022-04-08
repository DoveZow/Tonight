import React from "react";
import './Picture.css'

const Picture = props => (
    <div>
        <img className="pic" src={props.picture.url} alt={props.picture.title}/>
    </div>
);

export default Picture;