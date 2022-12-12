require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  try {
    let token = req.headers.token;
    let data = req.body;
    console.log("toek; ", token);
    var decoded = await jwt.verify(token, SECRET_KEY);
    req.body.userId = decoded.userid;

    //console.log("middle war rea.boy", data);
    // console.log("middleware success ", decoded); // bar
    next();
  } catch (err) {
    console.log("middleware err: ", err.message);
    res.send("Not authenticated please login...");
  }
};

module.exports = { auth };
