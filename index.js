const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");
const authorizeUser = require("./middleware/authorizeUser");
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const PORT = process.env.PORT || 3002;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
require("dotenv").config();
const { Pool } = require("pg");
const e = require("express");
const { get } = require("http");
const pool = new Pool({
  // ===== FOR HEROKU ===== //
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  

  // ===== FOR LOCAL ===== //
  user: "postgres",
  password: "Root",
  host: "localhost",
  port: 5432,
  database: "tonightusers"
}});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));

// ===== ROUTES ===== //

// create account
app.post("/createaccount", async (req, res) => {
  try {
    const { registerEmail, registerUsername, registerPassword, userType } =
      req.body;

    // if user or email already exists, throw an error
    const user = await pool.query(
      `SELECT * FROM users WHERE uemail ='${registerEmail}' OR uname = '${registerUsername}'`
    );

    if (user.rows.length !== 0) {
      return res.status(401).send("Email or username already exists.");
    }

    // encrypt password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPass = await bcrypt.hash(registerPassword, salt);

    // insert into database if not exists already
    const newUser = await pool.query(
      `INSERT INTO users (uname, uemail, upass, utype) VALUES ('${registerUsername}', '${registerEmail}', '${bcryptPass}', '${userType}') RETURNING *`
    );

    // generate a token
    const token = jwtGenerator(newUser.rows[0].uid);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { loginUsername, loginPassword } = req.body;

    const user = await pool.query(
      `SELECT * FROM users WHERE uname ='${loginUsername}' OR uemail = '${loginUsername}'`
    );

    if (user.rows.length === 0) {
      return res.status(401).send("Username or Password is incorrect");
    }

    const checkPassword = await bcrypt.compare(
      loginPassword,
      user.rows[0].upass
    );

    if (!checkPassword) {
      return res.status(401).json("Username or password is incorrect");
    }

    const token = jwtGenerator(user.rows[0].uid);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/checkemail", async (req, res) => {
  try {
    const { toEmail } = req.body;
    const user = await pool.query(
      `SELECT * FROM users WHERE uemail = '${toEmail}'`
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/verified", authorizeUser, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/", authorizeUser, async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT * FROM users WHERE uid = '${req.user}'`
    );

    res.json(user.rows[0]);
    // res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/changepass", async (req, res) => {
  try {
    const { confirmNewPassword, toEmail } = req.body;
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPass = await bcrypt.hash(confirmNewPassword, salt);

    const newPass = await pool.query(
      `UPDATE users SET upass = '${bcryptPass}' WHERE uemail = '${toEmail}'`
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/getall", async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users");

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/changeusercreds", async (req, res) => {
  try {
    const { uid, newUsername, newEmail, newType } = req.body;
    const newCreds = await pool.query(
      `UPDATE users SET uname = '${newUsername}', uemail = '${newEmail}', utype = '${newType}' WHERE uid = ${uid}`
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/deleteuser", async (req, res) => {
  try {
    const { idToDelete } = req.body;
    const deleteUser = await pool.query(
      `DELETE FROM users WHERE uid = ${idToDelete}`
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});


app.post("/search", (req, res)=>{
  console.log("Found search")
  let a = req.body.choices
  let b = req.body.second
  if(a == "Exoplanets"){
    if(b.length == 0){
    let locSearchString = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_masse,hostname,disc_year,pl_eqt,pl_orbper,ra,dec,pl_dens+from+ps&format=json'
    fetch(locSearchString)
  .then(Response=>{
    if(Response.ok){
      return Response.json();
    }
    else{
      throw Error(Response)
    }
  })
  .then(ResponseBody=>{
   const arr = []
   var indexStart = Math.floor(Math.random()*(ResponseBody.length));
   
   for(var i = 0; i < 10; i++){
    // console.log(indexStart);
    var pl_Mass = (ResponseBody[indexStart].pl_masse == null)?"Not Recorded Yet": ResponseBody[indexStart].pl_masse+" Earth Masses"
    var pl_temp = (ResponseBody[indexStart].pl_eqt  == null)?"Not Recorded Yet": ResponseBody[indexStart].pl_eqt+" °C"
    var pl_dens = (ResponseBody[indexStart].pl_dens == null)?"Not Recorded Yet": ResponseBody[indexStart].pl_dens+" kg/m^3"
    arr[i] = {planetName: ResponseBody[indexStart].pl_name, planetMass: pl_Mass, 
    hostStar: ResponseBody[indexStart].hostname, disc_year: ResponseBody[indexStart].disc_year, temp: pl_temp, orbitalPer: ResponseBody[indexStart].pl_orbper,
    ra: ResponseBody[indexStart].ra+"°", dec: ResponseBody[indexStart].dec+"°", dens: pl_dens}
    indexStart = Math.floor(Math.random()*(ResponseBody.length));
   }
  //  for(var j = 0; j < arr.length; j++){
  //    console.log("Planet Name: "+arr[j].planetName)
  //    console.log("Planet Mass: "+arr[j].planetMass)
  //    console.log("Host Star: "+arr[j].hostStar)
  //    console.log("Planet Discovery Year: "+arr[j].disc_year)
  //    console.log("Planet Temperature: "+arr[j].temp)
  //    console.log("Planet Density: "+arr[j].dens)
  //    console.log("Angle from Earth: ")
  //    console.log("Right Ascension: "+arr[j].ra)
  //    console.log("Declination: "+arr[j].dec)
  //    console.log("--------------"+j+"----------------")
  //  }
  res.render('pages/Exo.ejs', {arr})
  })
  .catch(Error => console.log(Error))
  }
  else
  {
    let locSearchString = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_masse,hostname,disc_year,pl_eqt,pl_orbper,ra,dec,pl_dens+from+ps&format=json'
    fetch(locSearchString)
  .then(Response=>{
    if(Response.ok){
      return Response.json();
    }
    else{
      throw Error(Response)
    }
  })
  .then(ResponseBody=>{
    var isFound = false
    var i = 0;
    while(i < ResponseBody.length){
      if(b === ResponseBody[i].pl_name){
        isFound = true
        break
      }
      i++
    }
    if(isFound == true){
    const arr = []
    var pl_Mass = (ResponseBody[i].pl_masse == null)?"Not Recorded Yet": ResponseBody[i].pl_masse+" Earth Masses"
    var pl_temp = (ResponseBody[i].pl_eqt  == null)?"Not Recorded Yet": ResponseBody[i].pl_eqt+" °C"
    var pl_dens = (ResponseBody[i].pl_dens == null)?"Not Recorded Yet": ResponseBody[i].pl_dens+" kg/m^3"
    arr[0] = {planetName: ResponseBody[i].pl_name, planetMass: pl_Mass, 
    hostStar: ResponseBody[i].hostname, disc_year: ResponseBody[i].disc_year, temp: pl_temp, orbitalPer: ResponseBody[i].pl_orbper,
    ra: ResponseBody[i].ra+"°", dec: ResponseBody[i].dec+"°", dens: pl_dens}
      res.render('pages/Exo.ejs', {arr})
    }
    else{
      console.log("Not found")
    }
  })
  .catch(Error => console.log(Error))
  }
  
}
  else if(a == "Near Earth Asteroids"){
    
      var today = new Date()
      var dd = (today.getDate() < 10)?"0"+today.getDate():today.getDate()
      var mm = ((today.getMonth()+1) < 10)?"0"+(today.getMonth()+1):(today.getMonth()+1)
      var start = today.getFullYear()+"-"+mm+"-"+dd
      var endDate = new Date(today.getTime()-(7*24*60*60*1000))
      var end = endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate();
      
      // console.log(start)
      // console.log(end)
      let locSearchString = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='+start+'&end_date='+end+'&api_key=TI7RtfSeXbx3B5S79ERZS6WjFYx6yJv1gpzECVmL'
    fetch(locSearchString)
  .then(Response=>{
    if(Response.ok){
      return Response.json();
    }
    else{
      throw Error(Response)
    }
  })
  .then(ResponseBody=>{
    // console.log(ResponseBody.near_earth_objects[start][0].name)
    
    
    
   const arr = []
  //  console.log(ResponseBody.near_earth_objects[start][0].close_approach_data[0].relative_velocity.kilometers_per_hour)
  //  console.log(ResponseBody.near_earth_objects[start][0].close_approach_data[0].miss_distance.kilometers)
   for(var i = 0; i < 10; i++){
    var is_potentially_hazardous_asteroid = (ResponseBody.near_earth_objects[start][i].is_potentially_hazardous_asteroid)?"Yes":"No"
    arr[i] = {name: ResponseBody.near_earth_objects[start][i].name, absolute_magnitude: ResponseBody.near_earth_objects[start][i].absolute_magnitude_h+" AU", estimated_diameter_min: ResponseBody.near_earth_objects[start][i].estimated_diameter.meters.estimated_diameter_min+" m", estimated_diameter_max: ResponseBody.near_earth_objects[start][i].estimated_diameter.meters.estimated_diameter_max+" m",
    is_potentially_hazardous_asteroid: is_potentially_hazardous_asteroid, approachDate: ResponseBody.near_earth_objects[start][i].close_approach_data[0].close_approach_date_full, velocity: ResponseBody.near_earth_objects[start][i].close_approach_data[0].relative_velocity.kilometers_per_hour+" km/h",
    miss_distance: ResponseBody.near_earth_objects[start][i].close_approach_data[0].miss_distance.kilometers+" km", orbitingBody: ResponseBody.near_earth_objects[start][i].close_approach_data[0].orbiting_body}
   }
  //  for(var j = 0; j < arr.length; j++){
  //      console.log("Asteroid Name: "+arr[j].name)
  //      console.log("Absolute Magnitude: "+arr[j].absolute_magnitude)
  //      console.log("Estimated Diameter Min: "+arr[j].estimated_diameter_min)
  //      console.log("Estimated Diameter Max: "+arr[j].estimated_diameter_max)
  //      console.log("Is Potentially Hazardous: "+arr[j].is_potentially_hazardous_asteroid)
  //      console.log("Approach Date And Time: "+arr[j].approachDate)
  //      console.log("Velocity: "+ arr[j].velocity)
  //      console.log("Miss Distance: "+arr[j].miss_distance)
  //      console.log("Orbiting Body: "+arr[j].orbitingBody)
  //      console.log("--------------"+j+"----------------")
  //    }

  
  res.render('pages/Aster.ejs', {arr})
  })
  .catch(Error => console.log(Error))
  }
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
