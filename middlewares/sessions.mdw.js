const session = require("express-session");
const flash = require("express-flash");

module.exports = function (app) {
  app.use(flash());
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: "SECRET_KEY",
      resave: false,
      saveUninitialized: true,
      cookie: {
        // secure: true
      },
    })
  );
};
