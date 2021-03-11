const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");

let userService = require("../services/user.service");

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
  limits: { fileSize: 1000000 }
});

route.get("/", async (req, res) => {
  const users = await userService.getAll();
  res.render("vwUser/index", {
    layout: "admin.hbs",
    manageUsers: true,
    users,
  });
});

route.get("/add", async (req, res) => {
  res.render("vwUser/add.hbs", {
    layout: "admin.hbs",
    manageUsers: true,
  });
});

route.post("/add", uploadAvatar.single("avatar"), async (req, res) => {
  let imgPath;
  if(req.file === undefined) {
    imgPath = "";
  } else {
    imgPath = "/public/images/avatars" + req.file.filename;
  }
  const user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    avatar: imgPath,
    is_admin: false,
  };

  await userService.add(user);
  res.redirect("/admin/users/add", {
    layout: "admin.hbs",
    manageUsers: true,
  });
  // userService
  //   .add(user)
  //   .then((data) => {
  //     res.redirect("/admin/users/add");
  //   })
  //   .catch((err) => res.send(err));
});

route.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userService.getOneById(id);

  res.render("vwUser/edit.hbs", {
    layout: "admin.hbs",
    manageUsers: true,
    user,
  });
});

route.post("/edit/:id", uploadAvatar.single("avatar"), async (req, res) => {
  let imgPath;
  if(req.file === undefined) {
    imgPath = "";
  } else {
    imgPath = "/public/images/avatars" + req.file.filename;
  }
  const user = {
    avatar: imgPath,
    name: req.body.name,
  };
  console.log(user);
  await userService.update(req.body.id, user);
  res.redirect("/admin/users");
});

module.exports = route;
