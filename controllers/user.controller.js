const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../database/db");
const sharp = require("sharp");
const checkAuthen = require("../authentication/check");

//Set Storage Engine for User's Avatar
const upload = multer({
  limits: {
    fileSize: 1000000, //10 MB
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return callback(new Error("Please upload an photo"));
    }
    callback(undefined, true);
  },
});

route.get("/", checkAuthen, async (req, res) => {
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

route.get("/add", checkAuthen, async (req, res) => {
  res.render("vwUser/add.hbs", {
    layout: "admin.hbs",
    manageUsers: true,
  });
});

route.post("/add", checkAuthen, upload.single("avatar"), async (req, res) => {
  let imgPath;
  if (req.file === undefined) {
    imgPath = "default";
  } else {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 200, height: 200 })
      .png()
      .toBuffer();
    console.log(buffer);
    const storageRef = storage
      .ref("images/avatars/")
      .put(buffer.toString("base64"))
      .then((snapshot) => {
        console.log("Upload image successful !");
        imgPath = snapshot.getDownloadURL();
        console.log(snapshot.getDownloadURL());
      });
  }
  const new_user = {
    email: req.body.email,
    password: req.body.password,
    userName: req.body.name,
    imageURL: imgPath,
  };

  db.auth()
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

route.post("/edit/:id", checkAuthen, upload.single("avatar"), async (req, res) => {
  // var imagesRef = storageRef.child('images/avatars/');
  const id = req.params.id;

  var imgPath;
  if (req.file === undefined) {
    imgPath = "default";
  } else {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 200, height: 200 })
      .png()
      .toBuffer();
    console.log("buffer: " + buffer);
    var storageRef = db
      .storage()
      .ref("images/avatars/")
      .put(buffer.toString("base64"))
      .then((snapshot) => {
        console.log("Upload image successful !");
        imgPath = snapshot.getDownloadURL();
        console.log(snapshot.getDownloadURL());
      });
  }

  const user = {
    imageURL: imgPath,
    userName: req.body.name,
    email: req.body.email,
  };
  console.log(user);

  db.database()
    .ref("Users/" + id)
    .update(
      {
        email: user.email,
        imageURL: user.imageURL,
        userName: user.userName,
      },
      (err) => {
        if (err) {
          console.log("Update failed");
        } else {
          console.log("Update success !");
        }
      }
    );

  // await userService.update(req.body.id, user);
  res.redirect("/admin/users");
});

route.get("/isUniqueEmail", checkAuthen, async (req, res) => {
  const email = req.query.email;
  const userRef = db.database().ref("/Users");
  const query = userRef.orderByChild("email").equalTo(email);
  query.on("value", (snapshot) => {
    var data = snapshot.val();
    if (data === null) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});

module.exports = route;
