import React from 'react';
import './today.css';
import moment from 'moment';
import { Button } from 'semantic-ui-react';

const update = () => {
    window.location.reload();
}

const TodayCard = ({weatherData}) => (
    <div className="main">
        <div className="head">
            <p className="header">{weatherData.name}</p>
            <Button className="button" inverted color='blue' circular icon='refresh' onClick={update}/> 
        </div>

        <div className="flex">
            <p className="visibility">Visibility: {weatherData.visibility}</p>
            <p className="visibility">Cloudiness: {weatherData.clouds}</p>
        </div>

        <div className="flex">
            <p className="twilight">Sunrise: {new Date(weatherData.sys.sunrise).toLocaleTimeString('en-US')}</p>
            <p className="twilight">Sunset: {new Date(weatherData.sys.sunset).toLocaleTimeString('en-US')}</p>
        </div>

        <div className="flex">
            <p className="description">Description: {weatherData.weather[0].description}</p>
        </div>

        <div className="flex">
            <p className="date">Time: {moment().format("HH:mm")}</p>
            <p className="date">Date: {moment().format('dddd')}</p>
        </div>
        <div className="flex">
            <p className="date">Last Updated: {weatherData.lastupdate}</p>
        </div>
    </div>
)

export default TodayCard;