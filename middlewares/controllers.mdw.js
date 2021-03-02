module.exports = function (app) {
  app.use("/", require("../controllers/index.controller"));
  app.use("/admin", require("../controllers/admin.controller"));
  app.use("/admin/artists/", require("../controllers/artist.controller"));
  app.use("/admin/users/", require("../controllers/user.controller"));
  app.use("/admin/songs/", require("../controllers/song.controller"));
  app.use("/admin/categories/", require("../controllers/category.controller"));
  app.use("/account/", require("../controllers/account.controller"));

  // Handle not found error
  app.use(function (req, res) {
    res.render("error/404", {
      layout: false,
    });
  });

  // Handle database error
  app.use(function (err, req, res) {
    console.error(err.stack);
    res.render("error/500", {
      layout: false,
    });
  });
};
