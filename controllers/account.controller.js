const express = require("express");
const route = express.Router();

const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");

let userService = require("../services/user.service");

route.get("/signup", (req, res) => {
  res.render("vwAccount/signup");
});

route.post("/signup", (req, res) => {
  const password = bcrypt.hash(req.body.password, 8);
  const user = {
    name: req.body.name,
    email: req.body.email,
    password,
    is_admin: false,
  };
  userService
    .add(user)
    .then((data) => {
      res.render("vwAccount/signup", {
        message: "Your account has been created",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

route.get("/signin", (req, res) => {
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

route.get("/isUniqueEmail", (req, res) => {
  const email = req.query.email;
  userService
    .getOneByEmail(email)
    .then((data) => {
      if (data === null) {
        res.json(true);
      } else {
        res.json(false);
      }
    })
    .catch((err) => res.send(err));
});
module.exports = route;
