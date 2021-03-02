const express = require("express");
const route = express.Router();

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = require("../models/User");

route.get("/", async (req, res) => {
  User.findAll({ raw: true })
    .then((users) =>
      res.render("vwUser/index", {
        layout: "main.hbs",
        users
      })
    )
    .catch((err) => res.send(err));
});

module.exports = route;
