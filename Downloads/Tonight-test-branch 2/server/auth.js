const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");

app.use(cors());
app.use(express.json());

const { Pool } = require("pg");
const pool = new Pool({
  // ===== FOR HEROKU ===== //
  // connectionString: process.env.DATABASE_URL,
  // ssl: {
  //     rejectUnauthorized: false
  // }

  // ===== FOR LOCAL ===== //
  user: "postgres",
  password: "mohaha889",
  host: "localhost",
  port: 5432,
  database: "tonightusers"
});

// ===== ROUTES ===== //

// create account
app.post("/createaccount", async (req, res) => {
  try {
    //creating account
    const usrEmail = req.body.uemail;
    const usrName = req.body.uname;
    const user = await pool.query(`SELECT * from users WHERE uemail='${usrEmail}' OR uname='${usrName}'`);
    if(user.rows.length !== 0){
      return res.status(401).send("User Credentials already exists")
    }
    await pool.query(`INSERT INTO users (uname, uemail) values ('${usrName}', '${usrEmail}') RETURNING *`);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/search", async (req, res) => {
  console.log(req.body.u-search-bar);
});

// login
app.post("/login", async (req, res) => {
  try {


    // type code here


  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(3002, () => {
  console.log("Server has started on port 3002");
});
