const express = require("express");
const route = express.Router();

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = require("../models/User");

route.get("/", async (req, res) => {
  await User.findAll({ attributes: ["id", "name", "email"] })
    .then((users) =>
      res.render("vwUser/index", {
        layout: "admin.hbs",
        manageUsers: true,
        users
      })
    )
    // .catch((err) => res.send(err));
});

route.get("/add", async (req, res) => {
  res.render("vwUser/add.hbs", {
    layout: "admin.hbs",
    manageUsers: true
  });
});

route.post("/add", async (req, res) => {

let role = req.body.role;
if(role == "admin") {
  is_admin = true;
} else {
  is_admin = false;
}
const new_user = await User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    is_admin: is_admin
  })
  // console.log(new_user);
  res.render("vwUser/add.hbs", {
    layout:"admin.hbs"
  });
});

route.get("/edit/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if(user.is_admin == 1) {
    user.role = "admin"
  } else {
    user.role = "member"
  }

  console.log(user);
  res.render("vwUser/edit.hbs", {
    layout: "admin.hbs",
    manageUsers: true,
    user
  })
});

route.post("/edit/:id", async (req, res) => {
  res.render("vwUser/edit", {
    layout: "admin.hbs",
    manageUsers: true,
  })
});


module.exports = route;
