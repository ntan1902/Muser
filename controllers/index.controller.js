const express = require("express");
const route = express.Router();
const db = require("../database/db");

// TEST
route.get("/", async (req, res) => {
  try {
    await db.authenticate();
    res.send("Connection has been established successfully.");
  } catch (error) {
    res.error("Unable to connect to the database:", error);
  }
});
module.exports = route;
