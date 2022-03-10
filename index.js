const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");
const authorizeUser = require("./middleware/authorizeUser");
const path = require("path");
const PORT = process.env.PORT || 3002;

require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  // ===== FOR HEROKU ===== //
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }

  // // ===== FOR LOCAL ===== //
  // user: "postgres",
  // password: "********",
  // host: "localhost",
  // port: 5432,
  // database: "tonightusers"
});

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
    const { registerEmail, registerUsername, registerPassword } = req.body;

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
      `INSERT INTO users (uname, uemail, upass) VALUES ('${registerUsername}', '${registerEmail}', '${bcryptPass}') RETURNING *`
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
      `SELECT * FROM users WHERE uname ='${loginUsername}'`
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
