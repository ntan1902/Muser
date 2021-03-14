const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("express-async-errors");
const flash = require("express-flash");
const app = express();
const port = process.env.PORT || 5000;
const passport = require("passport");
const session = require("express-session");
app.use(morgan("dev"));
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// const path = require("path")
// const viewsPath = path.join(__dirname,"../views")
// app.set('views', viewsPath)
app.use("/public", express.static("public"));

require("./middlewares/sessions.mdw")(app);
require("./middlewares/views.mdw")(app);
require("./middlewares/controllers.mdw")(app);

require("./middlewares/authentication.mdw"); // passport session on the go

app.listen(port, () => {
  console.log(`Web server is listening on http://localhost:${port}`);
});
