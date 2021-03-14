const session = require("express-session");
const flash = require("express-flash");
const passport = require('passport')
module.exports = function (app) {
  app.use(flash());
  app.use(
  session({
    secret: "SECRET_KEY",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secure: true
    },
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.set("trust proxy", 1);
};
