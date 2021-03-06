const express = require("express");
const route = express.Router();

const User = require("../models/User"); 
const Sequelize = require("sequelize");
const passport = require("passport");
const { Router } = require("express");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt")

route.get("/signup",async (req,res)=>{
  res.render("vwAccount/signup")
})

route.post("/signup",async (req,res)=>{
  const password = await bcrypt.hash(req.body.password,8)
  const user = await User.create({ 
    name: req.body.name,
    email: req.body.email,
    password,
    isAdmin: false
  });
  await user.save()
  res.render("vwAccount/signup",{message: "Your account has been created"})
})

route.get("/signin", async (req, res) => {
  res.render("vwAccount/signin");
});
route.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
    failureFlash: true,
  })
);
module.exports = route;
