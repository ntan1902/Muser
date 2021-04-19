const express = require("express");
const route = express.Router();
const path = require("path");
const db = require("../database/db");
const checkAuthen = require("../authentication/check");

route.get("/", checkAuthen, async (req, res) => {
  const userRef = db.database().ref("Users/");
  await userRef.on("value", (snapshot) => {
    users = snapshot.val();
    res.render("vwUser/index", {
      layout: "admin.hbs",
      manageUsers: true,
      users,
    });
  });
});

route.get("/add", checkAuthen, async (req, res) => {
  res.render("vwUser/add.hbs", {
    layout: "admin.hbs",
    manageUsers: true,
  });
});

route.post("/add", checkAuthen, async (req, res) => {
  var imgPath = req.body.avatar;
  if (imgPath == "") {
    //default image
    imgPath =
      "https://firebasestorage.googleapis.com/v0/b/tinmuser.appspot.com/o/avatar.png?alt=media&token=cbbc9e99-21f7-4990-937d-42bf8399b549";
  }
  const new_user = {
    email: req.body.email,
    password: req.body.password,
    userName: req.body.name,
    imageURL: imgPath,
  };
  console.log(new_user);

  await db
    .auth()
    .createUserWithEmailAndPassword(new_user.email, new_user.password)
    .then(() => {
      var newKey = db.database().ref().child("/Users").push().key;
      db.database()
        .ref("/Users/" + newKey)
        .set(
          {
            id: newKey,
            userName: new_user.userName,
            email: new_user.email,
            imageURL: new_user.imageURL,
          },
          (err) => {
            if (err) {
              console.log("Add failed !");
            } else {
              console.log("Add success !");
            }
          }
        );
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });

  res.redirect("/admin/users");
});

route.get("/edit/:id", checkAuthen, async (req, res) => {
  const id = req.params.id;
  const userRef = db.database().ref("Users/" + id);
  await userRef.on("value", (snapshot) => {
    const user = snapshot.val();
    console.log(user);
    res.render("vwUser/edit.hbs", {
      layout: "admin.hbs",
      manageUsers: true,
      user,
    });
  });
});

route.post("/edit/:id", checkAuthen, async (req, res) => {
  const id = req.params.id;
  var previewPath = req.body.previewAvatar;
  console.log("hello");
  console.log("previewPath: " + previewPath);
  var imgPath = req.body.avatar;

  if (imgPath == "") {
    imgPath = previewPath;
  }

  const edit_user = {
    imageURL: imgPath,
    userName: req.body.name,
  };
  console.log(edit_user);

  await db
    .database()
    .ref("Users/" + id)
    .update(
      {
        imageURL: edit_user.imageURL,
        userName: edit_user.userName,
      },
      (err) => {
        if (err) {
          console.log("Updatex failed");
        } else {
          console.log("Updatex success !");
        }
      }
    );

  res.redirect("/admin/users");
});

route.get("/isUniqueEmail", checkAuthen, async (req, res) => {
  const email = req.query.email;
  const userRef = db.database().ref("/Users");
  const query = userRef.orderByChild("email").equalTo(email);
  await query.once("value", (snapshot) => {
    var data = snapshot.val();
    console.log(data);
    if (data === null) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});

module.exports = route;
