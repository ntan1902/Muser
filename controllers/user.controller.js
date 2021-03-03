const express = require("express");
const route = express.Router();

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = require("../models/User");

route.get("/", async (req, res) => {
  User.findAll({ raw: true })
    .then((users) =>
      res.render("vwUser/index", {
        layout: "admin.hbs",
        manageUsers: true,
        users,
      })
    )
    .catch((err) => res.send(err));
});

route.get("/add", async (req, res) => {
  res.render("vwUser/add.hbs");
});

route.post("/add", async (req, res) => {
  res.render("vwUser/add.hbs");
});

module.exports = route;
