const express = require("express");
const route = express.Router();
const passport = require('passport')
route.get("/signin", (req, res) => {
  if(req.user){
    return res.redirect("/admin")
  }
  res.render("vwAccount/signin",{
    isLogin: true
  });
});

route.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/signin",
    failureFlash: true,
  })
);
route.get("/logout", (req, res) => {
  req.logOut();
  return res.redirect("/account/signin");
});

module.exports = route;
