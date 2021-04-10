const express = require("express");
const route = express.Router();
const checkAuthen = require("../authentication/check")

route.get("/", checkAuthen, function (req, res) {
  res.render("vwAdmin/index", {
    layout: "main.hbs",
    checked: true
  });
});

module.exports = route;
