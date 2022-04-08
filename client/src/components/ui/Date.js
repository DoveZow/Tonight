import React from "react";

const DateField = props => (
    <form onSubmit={props.updateDate}>
        Search pictures (YYYY-MM-DD):
        <input/>
        <input type="submit"/>
    </form>
);

export default Date;