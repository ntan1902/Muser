const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../database/db");
const checkAuthen = require("../authentication/check")

//Set Storage Engine for artist's Avatar
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

route.get("/", checkAuthen, async (req, res) => {
  const artistRef = db.database().ref("Artists/");
  artistRef.on("value", (snapshot) => {
    artists = snapshot.val();
    console.log(artists);
    res.render("vwartist/index", {
      layout: "admin.hbs",
      manageArtists: true,
      artists,
    });
  });
});

route.get("/add", checkAuthen, async (req, res) => {
  res.render("vwartist/add.hbs", {
    layout: "admin.hbs",
    manageArtists: true,
  });
});

route.post("/add", checkAuthen, uploadAvatar.single("avatar"), async (req, res) => {
  let imgPath;
  if (req.file === undefined) {
    imgPath = "";
  } else {
    imgPath = "/public/images/avatars/" + req.file.filename;
  }
  const new_artist = {
    artistName: req.body.artistName,
    imageURL: imgPath
  };

  var newKey = db.database().ref().child("/artists").push().key;
  db.database()
    .ref("/Artists/" + newKey)
    .set(
      {
        id: newKey,
        artistName: new_artist.artistName,
        imageURL: imgPath
      },
      (err) => {
        if (err) {
          console.log("Add failed !");
        } else {
          console.log("Add success !");
        }
      }
    );

  res.redirect("/admin/artists");
});

route.get("/edit/:id", checkAuthen, async (req, res) => {
  const id = req.params.id;
  const artistRef = db.database().ref("Artists/" + id);
  artistRef.on("value", (snapshot) => {
    const artist = snapshot.val();
    console.log(artist);
    res.render("vwartist/edit.hbs", {
      layout: "admin.hbs",
      manageArtists: true,
      artist,
    });
  });
});

route.post("/edit/:id", checkAuthen, uploadAvatar.single("avatar"), async (req, res) => {
  // var imagesRef = storageRef.child('images/avatars/');
  const id = req.params.id;

  let imgPath;
  if (req.file === undefined) {
    imgPath = req.body.previewAvatar;
  } else {
    imgPath = "/public/images/avatars/" + req.file.filename;
  }

  const edit_artist = {
    artistName: req.body.name,
    imageURL: imgPath
  };

  db.database()
    .ref("Artists/" + id)
    .update(
      {
        artistName: edit_artist.artistName,
        imageURL: imgPath
      },
      (err) => {
        if (err) {
          console.log("Update failed");
        } else {
          console.log("Update success !");
        }
      }
    );

  res.redirect("/admin/artists");
});

module.exports = route;
