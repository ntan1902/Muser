const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("express-async-errors");
const app = express();
const port = process.env.PORT || 4000;
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
require("./middlewares/locals.mdw")(app);

app.listen(port, () => {
  console.log(`Web server is listening on http://localhost:${port}`);
});
