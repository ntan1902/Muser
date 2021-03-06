const express = require("express");
const route = express.Router();

const User = require("../models/User");

const Sequelize = require("sequelize");
const passport = require("passport");
const Op = Sequelize.Op;

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
