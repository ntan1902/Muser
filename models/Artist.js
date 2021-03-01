const Sequelize = require("sequelize");
const db = require("../database/db");

const Artist = db.define("artist", {
  name: {
    type: Sequelize.STRING,
  },
  avatar: {
    type: Sequelize.TEXT,
  },
});
Artist.associate = function (models) {
  Artist.hasMany(models.ArtistSong, { foreignKey: "artist_id" });
};
// Artist.sync().then(() => {
//   console.log("Table `Artists` created");
// });
module.exports = Artist;
