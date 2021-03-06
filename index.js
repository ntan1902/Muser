const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("express-async-errors");
const app = express();
const port = process.env.PORT || 5000;
app.use(morgan("dev"));
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/public", express.static("public"));

require("./middlewares/sessions.mdw")(app);
require("./middlewares/views.mdw")(app);
require("./middlewares/locals.mdw")(app);
require("./middlewares/controllers.mdw")(app);

require("./authentication/authen");
app.listen(port, () => {
  console.log(`Web server is listening on http://localhost:${port}`);
});
