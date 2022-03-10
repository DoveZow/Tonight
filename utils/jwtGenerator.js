const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(uid) {
  const payload = {
    user: uid
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: 60 * 60 });
}

module.exports = jwtGenerator;
