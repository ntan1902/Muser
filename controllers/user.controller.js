const express = require("express");
const route = express.Router();

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = require("../models/User");

route.get("/", async (req, res) => {
  await User.findAll({ attributes: ["id", "name", "email"] })
    .then((users) =>
      res.render("vwUser/index", {
        layout: "admin.hbs",
        manageUsers: true,
        users
      })
    )
    // .catch((err) => res.send(err));
});

route.get("/add", async (req, res) => {
  res.render("vwUser/add.hbs", {
    layout: "admin.hbs",
    manageUsers: true
  });
});

route.post("/add", async (req, res) => {
const new_user = await User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    role:req.body.role,
    is_admin: false
  })
  // console.log(new_user);
  res.render("vwUser/add.hbs");
});

module.exports = route;
