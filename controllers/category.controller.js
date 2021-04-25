const express = require("express");
const router = express.Router();
const db = require("../database/db");
const checkAuthen = require("../authentication/check");

router.get("/", checkAuthen, async function (req, res) {
  res.render("vwCategory/index", {
    layout: "admin.hbs",
    manageCategories: true,
  });
});

router.get("/edit/:id", checkAuthen, async function (req, res) {
  const id = req.params.id;
  const categoryRef = db.database().ref("/Categories/" + id);

  await categoryRef.on("value", (snapshot) => {
    category = snapshot.val();
    res.render("vwCategory/edit", {
      layout: "admin.hbs",
      manageCategories: true,
      category,
    });
  });
});

router.post("/edit/:id", checkAuthen, async function (req, res) {
  const id = req.params.id;
  let previewPath = req.body.previewAvatar;
  let imgPath = req.body.avatar;
  if (imgPath == "") {
    imgPath = previewPath;
  }
  await db
    .database()
    .ref("/Categories/" + id)
    .update(
      {
        name: req.body.name,
        imageURL: imgPath,
      },
      (err) => {
        if (err) {
          console.log("Update failed !");
        } else {
          console.log("Update success !");
        }
      }
    );

  res.redirect("/admin/categories");
});

router.get("/add", checkAuthen, function (req, res) {
  res.render("vwCategory/add", {
    layout: "admin.hbs",
  });
});

router.post("/add", checkAuthen, async function (req, res) {
  let imgPath = req.body.avatar;
  console.log("*************" + imgPath);
  if (imgPath == "") {
    imgPath =
      "https://firebasestorage.googleapis.com/v0/b/tinmuser.appspot.com/o/avatar.png?alt=media&token=cbbc9e99-21f7-4990-937d-42bf8399b549";
  }

  let newKey = db.database().ref().child("/Categories").push().key;
  await db
    .database()
    .ref("/Categories/" + newKey)
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

  res.redirect("/admin/categories");
});

module.exports = router;
