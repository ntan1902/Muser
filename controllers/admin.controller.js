const express = require("express");
const route = express.Router();

route.get("/", function (req, res) {
  res.render("vwAdmin/index", {
    layout: "main.hbs",
  });
});

module.exports = route;
