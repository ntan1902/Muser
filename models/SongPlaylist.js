const Sequelize = require("sequelize");
const db = require("../database/db");

// `id` int not null auto_increment primary key,
// `song_id` int not null,
// `playlist_id` int not null,
// CONSTRAINT `songs_playlists_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) on delete cascade,
// CONSTRAINT `songs_playlists_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) on delete cascade

const SongPlaylist = db.define("SongPlaylist", {});

SongPlaylist.associate = function (models) {
  SongPlaylist.belongsTo(models.Song, { foreignKey: "song_id" });
  SongPlaylist.belongsTo(models.Playlist, { foreignKey: "playlist_id" });
};

// SongPlaylist.sync().then(() => {
//   console.log("Table `SongPlaylists` created");
// });
module.exports = SongPlaylist;
