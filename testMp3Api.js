// idMusic = "ZOAC7BUF";
// ZingMp3.getHome((page = 1));
// ZingMp3.getFullInfo(idMusic).then((data) => {
//   console.log(data);
// });

// ZingMp3.getSectionPlaylist("6Z87F988")
//   .then((data) => console.log(data[1].items))
//   .catch((err) => console.log(err));

const ZingMp3 = require("zingmp3-api");
const db = require("./database/db");

ZingMp3.getDetailPlaylist("ZWZB969E")
  .then(async (data) => {
    const songs = data.song.items;

    for (let i = 0; i < 1; i++) {
      let info = await ZingMp3.getFullInfo(songs[i].encodeId);
      let { title, thumbnailM, streaming, artists, genres } = info;
      // console.log(info);

      // Add category
      let list_cats = [];
      const catRef = db.database().ref("Categories/");
      await catRef.on("value", (snapshot) => {
        cats = Object.values(snapshot.val());
        cats.forEach((cat) => {
          console.log(cat.name);
          list_cats.push(cat.name);
        });
        // Kiểm tra trùng tên thể loại
        if(!list_cats.includes(genres[0].name)) {
          let categoryId = db.database().ref().child("/Categories").push().key;
          await db
            .database()
            .ref("/Categories/" + categoryId)
            .set(
              {
                id: categoryId,
                name: genres[0].name,
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
      });

      // Add artist
      let list_artists = [];
      const artistRef = db.database().ref("Artists/");
      await artistRef.on("value", (snapshot) => {
        _artists = Object.values(snapshot.val());
        _artists.forEach((_artist) => {
          console.log(_artist.name);
          list_artists.push(_artist.name);
        });
        // Kiểm tra trùng tên nghệ sĩ
        if (!list_artists.includes(artists[0].name)) {
          let artistId = db.database().ref().child("/artists").push().key;
          await db
            .database()
            .ref("/Artists/" + artistId)
            .set(
              {
                id: artistId,
                name: artists[0].name,
                imageURL: artists[0].thumbnail,
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
      });

      // Add song
      let list_songs = [];
      const songRef = db.database().ref("Songs/");
      await songRef.on("value", (snapshot) => {
        _songs = Object.values(snapshot.val());
        _songs.forEach((_song) => {
          list_songs.push(_song.name);
        });
        // Kiểm tra trùng tên nhạc
        if (!list_songs.includes(title)) {
          let songId = db.database().ref().child("/Songs").push().key;
          const new_song = {
            id: songId,
            name: title,
            uri: streaming["128"],
            imageURL: thumbnailM,
            categoryId: categoryId,
            artistId: artistId,
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
      });
    }

    // title -> Songs.songName
    // thumbnailM -> Songs.imageURL
    // streaming.128 -> Songs.uri

    // artists[0].name -> Artists.name [Lấy nghệ sĩ đầu tiên thôi]
    // artists[0].thumbnail -> Artists.imageURL
    //

    // genres[0].name -> Categories.name [Lấy thể loại đầu tiên thôi]
  })
  .catch((err) => console.log(err));
