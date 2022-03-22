
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

  var app = express()
  app.use(express.json());
  app.use(express.urlencoded({extended:false}));
  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  class weather{
      constructor(cityName, visibility, weather, temp, temp_min, temp_max){
        this.cityName = cityName
        this.visibility = visibility
        this.weather = weather
        this.temp = temp;
        this.temp_min = temp_min
        this.temp_max = temp_max
      }
    }
  app.get('/', (req, res) => {
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
        let w = ResponseBody.weather[0].main
        let cityName = ResponseBody.name
        let visibility = ResponseBody.visibility
        let temp = ResponseBody.main.temp
        let temp_min = ResponseBody.main.temp_min
        let temp_max = ResponseBody.main.temp_max
        
        W = new weather(cityName, visibility, w, temp, temp_min, temp_max)
        console.log(W.cityName);
        console.log(W.visibility)
        console.log(W.weather);
        console.log(W.temp);
        console.log(W.temp_max)
        console.log(W.temp_min)
        res.render('pages/db', W);
      })
    })
  .catch(Error => console.log(Error))
  })

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
