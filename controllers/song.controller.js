const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../database/db");

//Set Storage Engine for song's Avatar
const storageAvatar = multer.diskStorage({
  destination: "./public/images/avatars",
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadAvatar = multer({
  storage: storageAvatar,
  limits: { fileSize: 1000000 },
});

route.get("/", async (req, res) => {
  const songRef = db.database().ref("Songs/");
  songRef.on("value", (snapshot) => {
    songs = snapshot.val();
    console.log(songs);
    res.render("vwSong/index", {
      layout: "admin.hbs",
      manageSongs: true,
      songs,
    });
  });
});

route.get("/add", async (req, res) => {
  res.render("vwSong/add.hbs", {
    layout: "admin.hbs",
    manageSongs: true,
  });
});

route.post("/add", uploadAvatar.single("avatar"), async (req, res) => {
  let imgPath;
  if (req.file === undefined) {
    imgPath = "";
  } else {
    imgPath = "/public/images/avatars/" + req.file.filename;
  }
  const new_song = {
    songName: req.body.songName,
    link: req.body.link,
    categoryId: req.body.categoryId,
  };

  var newKey = db.database().ref().child("/Songs").push().key;
  db.database()
    .ref("/Songs/" + newKey)
    .set(
      {
        id: newKey,
        songName: new_song.songName,
        link: new_song.link,
        categoryId: new_song.categoryId,
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

route.get("/edit/:id", async (req, res) => {
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

route.post("/edit/:id", uploadAvatar.single("avatar"), async (req, res) => {
  // var imagesRef = storageRef.child('images/avatars/');
  const id = req.params.id;

  let imgPath;
  if (req.file === undefined) {
    imgPath = req.body.previewAvatar;
  } else {
    imgPath = "/public/images/avatars/" + req.file.filename;
  }

  const edit_song = {
    songName: req.body.name,
    link: req.body.link,
    categoryId: req.body.categoryId
  };

  db.database()
    .ref("Songs/" + id)
    .update(
      {
        songName: edit_song.songName,
        link: edit_song.link,
        categoryId: edit_song.categoryId
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
