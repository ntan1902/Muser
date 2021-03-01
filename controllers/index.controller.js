const express = require("express");
const route = express.Router();
const db = require("../database/db");

// TEST
route.get("/", async (req, res) => {
  res.render("home");
});
module.exports = route;
