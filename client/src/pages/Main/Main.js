import React, { Fragment, useState, useEffect } from "react";
import "../Main/Main.css";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/ui/Nav";
import Hero from "../../components/ui/Hero";
// import { TodayCard } from "../../components/ui/Today";


const Main = ({
  isAuthenticated,
  setIsAuthenticated,
  username,
  setUsername,
  isAdmin,
  setIsAdmin,
}) => {
  // class weather{
  //   constructor(cityName, visibility, description, temp, sunRise, sunSet, cloudiness, lastupdate, iconURL){
  //     this.cityName = cityName
  //     this.visibility = visibility
  //     this.description = description
  //     this.temp = temp;
  //     this.sunRise = sunRise
  //     this.sunSet = sunSet
  //     this.cloudiness = cloudiness
  //     this.lastupdate = lastupdate
  //     this.iconURL = iconURL;
  //   }
    
  // }
  const getUserCredentials = async () => {
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { token: localStorage.token }
      });
      const parseRes = await response.json();
      setUsername(parseRes.uname);
      if (parseRes.utype === "admin") {
        setIsAdmin(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
//   const [cityName, setCityName] = useState("");
//   const [visibility, setVisibility] = useState(0);
//   const [cloudiness, setCloudiness] = useState(0);
//   const [iconUrl, setIconURL] = useState("");
//   const [sunRise, setSunRise] = useState(0);
//   const [sunSet, setSunSet] = useState(0);
//   const [description, setDescription] = useState("");
//   const getWeatherData = async () => {
//       let locSearchString = 'https://api.ipgeolocation.io/ipgeo?apiKey=6d2554373fc549d29b62f5739e6fab91';
//       fetch(locSearchString)
//     .then(Response=>{
//       if(Response.ok){
//         return Response.json()
//       }
//       else{
//         throw Error(Response)
//       }
//     })
//     .then((ResponseBody,cityName)=>{
//       cityName = ResponseBody.city
//       fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=66e5b1463c9ea930161ab563e43f67e3&units=metric')
//       .then(Response=>{
//         if(Response.ok){
//           return Response.json()
//         }
//         else{
//           throw Error(Response)
//         }
//     })
//     .then(ResponseBody=>{
//         setCityName(ResponseBody.name)
//         setCloudiness(ResponseBody.clouds.all)
//         setDescription(ResponseBody.weather[0].description)
//         setIconURL("https://openweathermap.org/img/wn/"+ResponseBody.weather[0].icon+"@2x.png")
//         setSunRise(ResponseBody.sys.sunrise)
//         setSunSet(ResponseBody.sys.sunset)
//         setVisibility(ResponseBody.visibility)
//       })
//     })
//   .catch(Error => console.log(Error))
// }

  useEffect(() => {
    getUserCredentials();
    // getWeatherData();
  }, []);

  let navigate = useNavigate();
  return (
    <Fragment>
      <Nav
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setUsername={setUsername}
        username={username}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <Hero username={username} isAuthenticated={isAuthenticated} isAdmin={isAdmin}/>
      {/* <TodayCard cityName={cityName} visibility={visibility} cloudiness={cloudiness} iconUrl={iconUrl} sunRise={sunRise} sunSet={sunSet} description={description}/> */}
    </Fragment>
  );
};

export default Main;
