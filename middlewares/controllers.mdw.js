module.exports = function (app) {
  app.use("/", require("../controllers/index.controller"));
};
