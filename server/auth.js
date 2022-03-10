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
  password: "*******", // IMPORTANT: REPLACE STARS ADD YOUR POSTGRES PASSWORD HERE.
  host: "localhost",
  port: 5432,
  database: "tonightusers"
});

// ===== ROUTES ===== //

// create account
app.post("/createaccount", async (req, res) => {
  try {
    const { registerEmail, registerUsername } = req.body;

    // if user or email already exists, throw an error
    const user = await pool.query(
      `SELECT * FROM users WHERE uemail ='${registerEmail}' OR uname='${registerUsername}'`
    );

    if (user.rows.length !== 0) {
      return res.status(401).send("Email or username already exists.");
    }

    // // encrypt password
    // const saltRound = 10;
    // const salt = await bcrypt.genSalt(saltRound);
    // const bcryptPass = await bcrypt.hash(registerPassword, salt);

    // insert into database if not exists already
    await pool.query(
      `INSERT INTO users (uemail, uname) VALUES ('${registerEmail}', '${registerUsername}') RETURNING *`
    );

    // // generate a token
    // const token = jwtGenerator(newUser.rows[0].uid);
    // res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/getcredit", async (req, res) => {
  try {
    const { currentEmail } = req.body;
    const user = await pool.query(
      `SELECT * FROM users WHERE uemail = '${currentEmail}'`
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(3002, () => {
  console.log("Server has started on port 3002");
});
