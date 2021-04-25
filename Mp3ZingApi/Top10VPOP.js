const ZingMp3 = require("zingmp3-api");
const db = require("../database/db");
const fetch = require("node-fetch");

// title -> Songs.songName
// thumbnailM -> Songs.imageURL
// streaming.128 -> Songs.uri
// releaseDatae -> Songs.createdAt

// artists[0].name -> Artists.name [Lấy nghệ sĩ đầu tiên thôi]
// artists[0].thumbnail -> Artists.imageURL
//

// genres[0].name -> Categories.name [Lấy thể loại đầu tiên thôi]
// data.thumbnailM -> Categories.imageURL

const vpop = "ZWZB969E";

ZingMp3.getDetailPlaylist(vpop)
  .then(async (data) => {
    const songs = data.song.items;
    // console.log(data);
    // let info = await ZingMp3.getFullInfo(songs[9].encodeId);
    // console.log(info);

    for (let i = 0; i < 5; i++) {
      try {
        let info = await ZingMp3.getInfoMusic(songs[i].encodeId);
        let { encodeId, title, thumbnailM, artists, genres } = info;
        let categoryImageURL = data.thumbnailM;
        // console.log(info);

        // Add category
        let categoryId = await addCategory(
          genres[genres.length - 1].name,
          categoryImageURL
        );

        // Add artist
        let artistId = await addArtistName(
          artists[0].name,
          artists[0].thumbnail
        );

        // Get Random date
        let dates = [
          1524644469000,
          1564042869000,
          1619179858872,
          1619209221733,
          1582100469000,
          Date.now(),
        ];

        // Add song
        addSong(
          encodeId,
          title,
          thumbnailM,
          categoryId,
          artistId,
          "" + dates[Math.floor(Math.random() * dates.length)]
        );
      } catch (err) {
        console.log(err);
      }
    }
  })
  .catch((err) => console.log(err));

const addCategory = (categoryName, imageURL) => {
  let categoryId;
  let categoryExist = false;

  return new Promise((resolve, reject) => {
    const catRef = db.database().ref("Categories/");
    catRef.once("value", async (snapshot) => {
      if (snapshot.exists()) {
        cats = Object.values(snapshot.val());
        cats.forEach((cat) => {
          if (cat.name === categoryName) {
            categoryExist = true;
            categoryId = cat.id;
          }
        });
      }
      // Kiểm tra trùng tên thể loại
      if (!categoryExist) {
        categoryId = db.database().ref().child("/Categories").push().key;
        await db
          .database()
          .ref("/Categories/" + categoryId)
          .set(
            {
              id: categoryId,
              name: categoryName,
              imageURL: imageURL,
            },
            (err) => {
              if (err) {
                console.log("Add failed !");
              } else {
                console.log("Add success !");
              }
            }
          );
      }
      resolve(categoryId);
    });
  });
};

const addArtistName = (artistName, imageURL) => {
  let artistId;
  let artistNameExist = false;

  return new Promise((resolve, reject) => {
    const artistRef = db.database().ref("Artists/");
    artistRef.once("value", async (snapshot) => {
      if (snapshot.exists()) {
        _artists = Object.values(snapshot.val());
        _artists.forEach((_artist) => {
          if (_artist.name === artistName) {
            artistNameExist = true;
            artistId = _artist.id;
          }
        });
      }
      // Kiểm tra trùng tên nghệ sĩ
      if (!artistNameExist) {
        artistId = db.database().ref().child("/artists").push().key;
        await db
          .database()
          .ref("/Artists/" + artistId)
          .set(
            {
              id: artistId,
              name: artistName,
              imageURL: imageURL,
            },
            (err) => {
              if (err) {
                console.log("Add failed !");
              } else {
                console.log("Add success !");
              }
            }
          );
      }
      resolve(artistId);
    });
  });
};

const addSong = (
  encodeId,
  songName,
  imageURL,
  categoryId,
  artistId,
  createdAt
) => {
  let songId;
  let songNameExist = false;

  return new Promise((resolve, reject) => {
    const songRef = db.database().ref("Songs/");
    songRef.once("value", async (snapshot) => {
      if (snapshot.exists()) {
        _songs = Object.values(snapshot.val());
        _songs.forEach((_song) => {
          if (_song.name === songName) {
            songNameExist = true;
            songId = _song.id;
          }
        });
      }

      // Kiểm tra trùng tên nhạc
      if (!songNameExist) {
        songId = db.database().ref().child("/Songs").push().key;

        // Get 320 quality
        let request = `https://api.mp3.zing.vn/api/streaming/audio/${encodeId}/320`;
        const res = await fetch(request);

        const new_song = {
          id: songId,
          name: songName,
          uri: res.url,
          imageURL: imageURL,
          categoryId: categoryId,
          artistId: artistId,
          createdAt: "" + createdAt,
        };
        await db
          .database()
          .ref("/Songs/" + songId)
          .set(new_song, (err) => {
            if (err) {
              console.log("Add failed !");
            } else {
              console.log("Add success !");
            }
          });
      }
      resolve(true);
    });
  });
};
