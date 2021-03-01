const express = require("express");
const route = express.Router();

const User = require("../models/User");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

route.get("/", async (req, res) => {});
module.exports = route;
