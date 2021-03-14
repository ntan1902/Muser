const express = require("express");
const route = express.Router();
const db = require("../database/db");

// TEST
route.get("/", async (req, res) => {
  res.render("home");
});

route.get("/login",async(req,res)=>{
  console.log("hjeel;o")
  res.render("vwAccount/signin")
})

route.get("/signup",async(req,res)=>{
  res.render("vwAccount/signup")
})

module.exports = route;
