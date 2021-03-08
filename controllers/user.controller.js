const express = require("express");
const route = express.Router();

let userService = require("../services/user.service");

route.get("/", (req, res) => {
  userService
    .getAll()
    .then((data) => {
      res.render("vwUser/index", {
        layout: "admin.hbs",
        manageUsers: true,
        users: data,
      });
    })
    .catch((err) => res.send(err));
});

route.get("/add", async (req, res) => {
  res.render("vwUser/add.hbs", {
    layout: "admin.hbs",
    manageUsers: true,
  });
});

route.post("/add", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    is_admin: false,
  };

  userService
    .add(user)
    .then((data) => {
      res.redirect("/admin/users/add");
    })
    .catch((err) => res.send(err));
});

module.exports = route;
