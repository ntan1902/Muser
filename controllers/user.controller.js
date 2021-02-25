const express = require("express");
const route = express.Router();

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

route.get("/", async (req, res) => {
  // Artist.findAll()
  //   .then((artists) => res.send(artists))
  //   .catch((err) => res.send(err));
});
module.exports = route;
