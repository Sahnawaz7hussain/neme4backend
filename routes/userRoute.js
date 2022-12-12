const express = require("express");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const userRoute = express.Router();

userRoute.post("/signup", async (req, res) => {
  let { email, name, password } = req.body;
  let isPresent = await UserModel.findOne({ email });
  if (isPresent) {
    res.send("User already exist, Please login...");
  } else {
    bcrypt.genSalt(+process.env.ROUND, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          console.log("Hash err", err);
          res.send("something went wrong please try again later");
        }
        if (hash) {
          let newU = UserModel({ email, password: hash, name });
          await newU.save();
          console.log("sign success res", hash);
          res.send("Signup Success");
        }
      });
    });
  }
  //  console.log(req.body, "    ", isPresent);
  // res.send("user");
});

userRoute.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let isPresent = await UserModel.findOne({ email });
  if (!isPresent) {
    res.send("user not found, please sign up... ");
  } else {
    bcrypt.compare(password, isPresent.password, function (err, result) {
      if (err) {
        res.send("something went wrong please try again later..");
      }
      if (result) {
        var token = jwt.sign(
          { userid: isPresent._id, name: isPresent.name },
          process.env.SECRET_KEY
        );
        res.send({
          msg: "Login Success",
          token: token,
          userid: isPresent._id,
        });
      } else {
        res.send("please give correct password");
      }
    });
  }
});

module.exports = { userRoute };
