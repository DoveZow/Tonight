import React, { useState, useEffect } from "react";
import "./Hero.css";
import HeroButtons from "../HeroButtons";
import { TodayCard } from "./Today";
import Potd from "./potd";

const Hero = ({ username, isAuthenticated, isAdmin }) => {
  let heroHeader = "";
  let heroP = "";

  if (isAuthenticated && !isAdmin) {
    heroHeader = `Hello, ${username}`;
  } else if (isAuthenticated && isAdmin) {
    heroHeader = "Welcome to Admin Dashboard";
  } else {
    heroHeader = "Welcome to Tonight";
  }

  if (isAdmin) {
    heroP = "";
  } else {
    heroP =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim";
  }
  const [cityName, setCityName] = useState("");
  const [visibility, setVisibility] = useState(0);
  const [cloudiness, setCloudiness] = useState(0);
  const [iconUrl, setIconURL] = useState("");
  const [sunRise, setSunRise] = useState(0);
  const [sunSet, setSunSet] = useState(0);
  const [description, setDescription] = useState("");
  const getWeatherData = async () => {
      let locSearchString = 'https://api.ipgeolocation.io/ipgeo?apiKey=6d2554373fc549d29b62f5739e6fab91';
      fetch(locSearchString)
    .then(Response=>{
      if(Response.ok){
        return Response.json()
      }
      else{
        throw Error(Response)
      }
    })
    .then((ResponseBody,cityName)=>{
      cityName = ResponseBody.city
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=66e5b1463c9ea930161ab563e43f67e3&units=metric')
      .then(Response=>{
        if(Response.ok){
          return Response.json()
        }
        else{
          throw Error(Response)
        }
    })
    .then(ResponseBody=>{
        setCityName(ResponseBody.name)
        setCloudiness(ResponseBody.clouds.all)
        setDescription(ResponseBody.weather[0].description)
        setIconURL("https://openweathermap.org/img/wn/"+ResponseBody.weather[0].icon+"@2x.png")
        setSunRise(ResponseBody.sys.sunrise)
        setSunSet(ResponseBody.sys.sunset)
        setVisibility(ResponseBody.visibility)
      })
    })
  .catch(Error => console.log(Error))
}

useEffect(() => {
  getWeatherData();
}, []);
  return (
    <div
      className={
        isAdmin
          ? "hero-container width-100 hero-background-admin"
          : "hero-container width-100 hero-background"
      }
    >
      <div className="hero center-content text-white">
        <div className="hero-text">
          <h2>{heroHeader}</h2>
        </div>
          <div class="weather">
          <TodayCard cityName={cityName} visibility={visibility} cloudiness={cloudiness} iconUrl={iconUrl} sunRise={sunRise} sunSet={sunSet} description={description}/>
          </div>
          {/* <p>{heroP}</p> */}
          <HeroButtons isAdmin={isAdmin} />
        </div>
        <div className="potd">
          <Potd/>
        </div>
        {/* <TodayCard cityName={cityName} visibility={visibility} cloudiness={cloudiness} iconUrl={iconUrl} sunRise={sunRise} sunSet={sunSet} description={description}/> */}
      
    </div>
  );
};

export default Hero;
