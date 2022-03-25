import React from 'react';
import './potd.css';
import Date from "./components/Date";
import Picture from "./components/Picture.js";

class Potd extends Component {
    state = {
        date: "",
        picture: ""
    };

    updateDate = e => {
        e.preventDefault();
        let inputDate = e.target[0].value;
        this.setState({date: inputDate});
        this.searchPicture(inputDate);
    };
    
    componentDidMount() {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=ITn8ph7dc3aNFW7nm8HcD5VvDNkgheiGi4qcwO98`)
        .then(response => response.json())
        .then(json => this.setState({picture: json}));
    }

    searchPicture = date => {
        fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=ITn8ph7dc3aNFW7nm8HcD5VvDNkgheiGi4qcwO98`)
        .then(response => response.json())
        .then(object => this.setState({picture: object}));
    }

    render() {
        return(
            <div>
                <h1>NASA Astronomy Picture of the Day</h1>
                <Date updateDate={this.updateDate}/>
                <Picture picture={this.state.picture}/>
            </div>
        );
    }
}

export default Potd;