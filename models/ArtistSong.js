const Sequelize = require("sequelize");
const db = require("../database/db");

// `id` int not null auto_increment primary key,
// `artist_id` int not null,
// `song_id` int not null,
// CONSTRAINT `artist_lists_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) on delete cascade,
// CONSTRAINT `artist_lists_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) on delete cascade

const ArtistSong = db.define("ArtistSong", {});

ArtistSong.associate = function (models) {
  ArtistSong.belongsTo(models.Artist, { foreignKey: "artist_id" });
  ArtistSong.belongsTo(models.Song, { foreignKey: "song_id" });
};

ArtistSong.sync().then(() => {
  console.log("Table `ArtistSongs` created");
});
module.exports = ArtistSong;
