const db = require("../database/db");

module.exports = function(app) {
    app.use(function (req, res, next) {
        const categoryRef = db.database().ref("/Categories/");
        categoryRef.on("value", (snapshot) => {
            categories = snapshot.val();
            res.locals.listCategories = categories;
        });

        const artistRef = db.database().ref("/Artists/");
        artistRef.on("value", (snapshot) => {
            artists = snapshot.val();
            res.locals.listArtists = artists;
        })
        next();
      });
};
