const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../database/db");

//Set Storage Engine for User's Avatar
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
  const userRef = db.database().ref("Users/");
  userRef.on("value", (snapshot) => {
    users = snapshot.val();
    console.log(users);
    res.render("vwUser/index", {
      layout: "admin.hbs",
      manageUsers: true,
      users,
    });
  });
});

route.get("/add", async (req, res) => {
  res.render("vwUser/add.hbs", {
    layout: "admin.hbs",
    manageUsers: true,
  });
});

// route.post("/add", uploadAvatar.single("avatar"), async (req, res) => {
//   let imgPath;
//   if (req.file === undefined) {
//     imgPath = "";
//   } else {
//     imgPath = "/public/images/avatars/" + req.file.filename;
//   }
//   const user = {
//     email: req.body.email,
//     password: req.body.password,
//     name: req.body.name,
//     avatar: imgPath,
//     is_admin: false,
//   };

//   res.redirect("/admin/users");
// });

route.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const userRef = db.database().ref("Users/" + id);
  userRef.on("value", (snapshot) => {
    const user = snapshot.val();
    console.log(user);
    res.render("vwUser/edit.hbs", {
      layout: "admin.hbs",
      manageUsers: true,
      user,
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

  const user = {
    imageURL: imgPath,
    userName: req.body.name,
    email: req.body.email,
  };
  console.log(user);
  
  db.database().ref("Users/" + id).update({
    email: user.email,
    // imageURL: user.imageURL,
    userName: user.userName,
  }, (err) => {
    if(err) {
      console.log("Update failed");
    } else {
      console.log("Update success !");
    }
  });
  
  // await userService.update(req.body.id, user);
  res.redirect("/admin/users");
});

module.exports = route;
