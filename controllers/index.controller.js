const express = require("express");
const route = express.Router();
const db = require("../database/db");
// TEST
route.get("/", async (req, res) => {
  if(req.isAuthenticated()){
    return res.redirect('/admin')
  }
  else{
    return res.redirect('/account/signin')
  }
});

module.exports = route;
