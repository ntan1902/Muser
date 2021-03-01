const Sequelize = require("sequelize");
const db = require("../database/db");

// `id` int not null auto_increment primary key,
// `name` varchar(20) not null,
// `link` text default null,
// `category_id` int not null,
// CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) on delete cascade
const Song = db.define("Song", {
  name: {
    type: Sequelize.STRING,
  },
  link: {
    type: Sequelize.TEXT,
  },
});

Song.associate = function (models) {
  Song.belongsTo(models.Category, { foreignKey: "category_id" });
  Song.hasMany(models.SongPlaylist, { foreignKey: "song_id" });
  Song.hasMany(models.ArtistSong, { foreignKey: "song_id" });
};

// Song.sync().then(() => {
//   console.log("Table `Categories` created");
// });
module.exports = Song;
