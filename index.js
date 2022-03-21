const express = require('express')
const path = require('path')
const fetch = (...args)=>import('node-fetch').then(({default: fetch})=>fetch(...args));
const PORT = process.env.PORT || 5000


var app = express()

app.use(express.json());
app.use(express.urlencoded({extended:false}));
class weather{
  constructor(weather, temp, minTemp, MaxTemp, visibility, name){
    this.name = name;
    this.visibility = visibility;
    this.weather = weather;
    this.temp = temp;
    this.minTemp = minTemp;
    this.MaxTemp = MaxTemp;
  }
}
  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

  app.post('/s', (req,res)=>{
  var cityName = req.body.cityName;
  var searchString = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=66e5b1463c9ea930161ab563e43f67e3&units=metric';
  console.log(searchString);
  fetch(searchString)
  .then(Response=>{
    if(Response.ok){
      return Response.json()
    }
    else{
      throw Error(Response)
    }
  })
  .then(ResponseBody=> {
    let a = ResponseBody.main.temp;
    let t = ResponseBody.main.temp_min;
    let t2 = ResponseBody.main.temp_max;
    let w = ResponseBody.weather[0].main;
    let v = ResponseBody.visibility;
    let n = ResponseBody.name;
    Weather = new weather(w, a, t, t2, v, n);
    console.log("You search weather for "+Weather.name);
    console.log("Current Weather is "+ Weather.weather);
    console.log("Current Visibility is "+ Weather.visibility);
    console.log("Current temperature is "+Weather.temp);
    console.log("Max Temperature reached will be "+ Weather.MaxTemp);
    console.log("Min Temperature reached will be "+ Weather.minTemp);
    res.render('pages/viewing', Weather);
    

    
  })
  .catch(erorr=>console.log(console.error()))
  })
