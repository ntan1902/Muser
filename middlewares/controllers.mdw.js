module.exports = function (app) {
  app.use("/", require("../controllers/index.controller"));
  app.use("/admin/artists/", require("../controllers/artist.controller"));
  app.use("/admin/users/", require("../controllers/artist.controller"));
  app.use("/admin/songs/", require("../controllers/artist.controller"));
};
