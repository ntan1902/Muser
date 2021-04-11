const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../database/db");
const checkAuthen = require("../authentication/check");

route.get("/", checkAuthen, async (req, res) => {
  const songRef = db.database().ref("Songs/");
  songRef.on("value", (snapshot) => {
    songs = snapshot.val();
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
  const new_song = {
    name: req.body.name,
    uri: req.body.uri,
    imageURL: req.body.imageURL,
    categoryId: req.body.categoryId,
    artistId: req.body.artistId,
  };

  console.log(new_song);

  var newKey = db.database().ref().child("/Songs").push().key;
  db.database()
    .ref("/Songs/" + newKey)
    .set(
      {
        id: newKey,
        name: new_song.name,
        uri: new_song.uri,
        imageURL: new_song.imageURL,
        categoryId: new_song.categoryId,
        artistId: new_song.artistId,
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
  songRef.on("value", (snapshot) => {
    const song = snapshot.val();
    console.log(song);
    res.render("vwSong/edit.hbs", {
      layout: "admin.hbs",
      manageSongs: true,
      song,
    });
  });
});

route.post("/edit/:id", checkAuthen, async (req, res) => {
  const id = req.params.id;

  let imgPath;
  if (req.file === undefined) {
    imgPath = req.body.previewAvatar;
  } else {
    imgPath = "/public/images/avatars/" + req.file.filename;
  }

  const edit_song = {
    name: req.body.name,
    uri: req.body.uri,
    categoryId: req.body.categoryId,
    artistId: req.body.artistId,
  };

  db.database()
    .ref("Songs/" + id)
    .update(
      {
        name: edit_song.name,
        uri: edit_song.uri,
        categoryId: edit_song.categoryId,
        artistId: edit_song.artistId,
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
