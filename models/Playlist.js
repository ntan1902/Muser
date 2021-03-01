const Sequelize = require("sequelize");
const db = require("../database/db");

// `id` int not null auto_increment primary key,
// `name` varchar(20) not null,
// `image` text default null,
// `created_at` date default null,
// `updated_at` date default null,
// `user_id` int not null,
// CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) on delete cascade
const Playlist = db.define("playlist", {
  name: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.TEXT,
  },
});

Playlist.associate = function (models) {
  Playlist.belongsTo(models.User, { foreignKey: "user_id" });
  Playlist.hasMany(models.SongPlaylist, { foreignKey: "playlist_id" });
};

// Playlist.sync().then(() => {
//   console.log("Table `Playlists` created");
// });
module.exports = Playlist;
