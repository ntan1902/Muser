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

  categoryRef.on("value", (snapshot) => {
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
  db.database()
    .ref("/Categories/" + id)
    .update(
      {
        name: req.body.name,
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
  var newKey = db.database().ref().child("/Categories").push().key;
  db.database()
    .ref("/Categories/" + newKey)
    .set(
      {
        id: newKey,
        name: req.body.name,
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
