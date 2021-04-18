const express = require("express");
const route = express.Router();
const path = require("path");
const db = require("../database/db");
const checkAuthen = require("../authentication/check");

route.get("/", checkAuthen, async (req, res) => {
  const artistRef = db.database().ref("Artists/");
  await artistRef.on("value", (snapshot) => {
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

route.post("/add", checkAuthen, async (req, res) => {
  var imgPath = req.body.avatar;
  console.log("*************" + imgPath);
  if (imgPath == "") {
    imgPath =
      "https://firebasestorage.googleapis.com/v0/b/tinmuser.appspot.com/o/avatar.png?alt=media&token=cbbc9e99-21f7-4990-937d-42bf8399b549";
  }

  var newKey = db.database().ref().child("/artists").push().key;
  await db
    .database()
    .ref("/Artists/" + newKey)
    .set(
      {
        id: newKey,
        name: req.body.name,
        imageURL: imgPath,
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
  await artistRef.on("value", (snapshot) => {
    const artist = snapshot.val();
    console.log(artist);
    res.render("vwartist/edit.hbs", {
      layout: "admin.hbs",
      manageArtists: true,
      artist,
    });
  });
});

route.post("/edit/:id", checkAuthen, async (req, res) => {
  const id = req.params.id;
  var previewPath = req.body.previewAvatar;
  var imgPath = req.body.avatar;
  if (imgPath == "") {
    imgPath = previewPath;
  }

  await db
    .database()
    .ref("Artists/" + id)
    .update(
      {
        name: req.body.name,
        imageURL: imgPath,
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
