import React from "react";

const Picture = props => (
    <div>
        <h2>{props.picture.title}</h2>
        <img src={props.picture.url} alt={props.picture.title}/>
        <p>{props.picture.explanation}</p>
    </div>
);

export default Picture;