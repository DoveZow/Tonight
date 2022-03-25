import React from 'react';
import './today.css';
import moment from 'moment';
import { Button } from 'semantic-ui-react';

const update = () => {
    window.location.reload();
}


export class TodayCard extends React.Component{
    
    render(){
        return(
    <div className="main">
        <div className="head">
            <p className="header">{this.props.cityName}</p>
    
        </div>

        <div className="flex">
            <p className="visibility">Visibility: {this.props.visibility}</p>
            <p className="visibility">Cloudiness: {this.props.cloudiness}</p>
        </div>

        <div className="flex">
            <p className="twilight">Sunrise: {new Date(this.props.sunRise).toLocaleTimeString('en-US')}</p>
            <p className="twilight">Sunset: {new Date(this.props.sunSet).toLocaleTimeString('en-US')}</p>
        </div>

        <div className="flex">
            <p className="description">Description: {this.props.description} <img class="IMG" src = {this.props.iconUrl}/> </p>
        </div>

        <div className="flex">
            <p className="date">Time: {moment().format("HH:mm")}</p>
            <p className="date">Date: {moment().format('dddd')}</p>
        </div>
    </div>
        )}
}