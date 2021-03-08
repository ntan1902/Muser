const express = require("express");
const route = express.Router();

let userService = require("../services/user.service");

route.get("/", async (req, res) => {
  const users = await userService.getAll();
  res.render("vwUser/index", {
    layout: "admin.hbs",
    manageUsers: true,
    users
  });
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

  await userService.add(user);
  res.redirect("/admin/users/add", {
    layout:"admin.hbs",
    manageUsers:true
  });
  // userService
  //   .add(user)
  //   .then((data) => {
  //     res.redirect("/admin/users/add");
  //   })
  //   .catch((err) => res.send(err));
});

route.get("/edit/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user.is_admin == 1) {
    user.role = "admin";
  } else {
    user.role = "member";
  }

  console.log(user);
  res.render("vwUser/edit.hbs", {
    layout: "admin.hbs",
    manageUsers: true,
    user,
  });
});

route.post("/edit/:id", async (req, res) => {
  res.render("vwUser/edit", {
    layout: "admin.hbs",
    manageUsers: true,
  });
});

module.exports = route;
