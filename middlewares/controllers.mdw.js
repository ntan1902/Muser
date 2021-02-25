module.exports = function (app) {
  app.use("/", require("../controllers/index.controller"));
  app.use("/artists/", require("../controllers/artist.controller"));
};
