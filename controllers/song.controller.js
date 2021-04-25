const express = require("express");
const route = express.Router();
const path = require("path");
const db = require("../database/db");
const checkAuthen = require("../authentication/check");
const moment = require("moment");

route.get("/", checkAuthen, async (req, res) => {
  const songRef = db.database().ref("Songs/");
  await songRef.on("value", async (snapshot) => {
    let songs = [];

    // console.log(Object.values(snapshot.val()));
    for (let song of Object.values(snapshot.val())) {
      console.log("Song: " + song);

      let categoryRef = db.database().ref("/Categories/" + song.categoryId);
      let artistRef = db.database().ref("/Artists/" + song.artistId);

      await categoryRef.on("value", (snapshot) => {
        category = snapshot.val();
        song.category = category.name;
      });

      await artistRef.on("value", (snapshot) => {
        artist = snapshot.val();
        song.artist = artist.name;
      });

      console.log("After: " + song);
      songs.push(song);
    }

    res.render("vwSong/index", {
      layout: "admin.hbs",
      manageSongs: true,
      songs,
    });
  });
});

route.get("/add", checkAuthen, async (req, res) => {
  res.render("vwSong/add.hbs", {
    layout: "admin.hbs",
    manageSongs: true,
  });
});

route.post("/add", checkAuthen, async (req, res) => {
  let today = Date.now();
  const new_song = {
    name: req.body.name,
    uri: req.body.uri,
    imageURL: req.body.imageURL,
    categoryId: req.body.categoryId,
    artistId: req.body.artistId,
    createdAt: today,
  };
  let newKey = db.database().ref().child("/Songs").push().key;

  await db
    .database()
    .ref("/Songs/" + newKey)
    .set(
      {
        id: newKey,
        ...new_song,
      },
      (err) => {
        if (err) {
          console.log("Add failed !");
        } else {
          console.log("Add success !");
        }
      }
    );
  res.redirect("/admin/songs");
});

route.get("/edit/:id", checkAuthen, async (req, res) => {
  const id = req.params.id;
  const songRef = db.database().ref("Songs/" + id);
  await songRef.on("value", (snapshot) => {
    const song = snapshot.val();
    console.log(song);
    let date = new Date(parseInt(song.createdAt));
    song.createdAt = moment(date).format("DD/MM/yyyy");
    res.render("vwSong/edit.hbs", {
      layout: "admin.hbs",
      manageSongs: true,
      song,
    });
  });
});

route.post("/edit/:id", checkAuthen, async (req, res) => {
  const id = req.params.id;

  let link_avatar, link_uri;
  if (req.body.avatar == "") {
    link_avatar = req.body.previewAvatar;
  } else {
    link_avatar = req.body.avatar;
  }

  if (req.body.uri == "") {
    link_uri = req.body.previewUri;
  } else {
    link_uri = req.body.uri;
  }

  const edit_song = {
    name: req.body.name,
    uri: link_uri,
    imageURL: link_avatar,
    categoryId: req.body.categoryId,
    artistId: req.body.artistId,
  };

  await db
    .database()
    .ref("Songs/" + id)
    .update(
      {
        ...edit_song,
      },
      (err) => {
        if (err) {
          console.log("Update failed");
        } else {
          console.log("Update success !");
        }
      }
    );

  // await songService.update(req.body.id, song);
  res.redirect("/admin/songs");
});

module.exports = route;
