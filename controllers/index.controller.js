const express = require("express");
const route = express.Router();
const db = require("../database/db");
const passport = require('passport')
// TEST
route.get("/", async (req, res) => {
  res.render("home");
});

route.get("/login", async (req, res) => {
  res.render("vwAccount/signin");
});
route.post(
  "/login",
  passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
  })
);

module.exports = route;
