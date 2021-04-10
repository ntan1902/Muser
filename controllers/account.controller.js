const express = require("express");
const route = express.Router();

// route.get("/signin", (req, res) => {
//   if(req.user){
//     return res.redirect("/")
//   }
//   res.render("vwAccount/signin");
// });

// route.post(
//   "/signin",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/signin",
//     failureFlash: true,
//   })
// );

// route.get("/isUniqueEmail", async (req, res) => {
//   const email = req.query.email;
//   // userService
//   //   .getOneByEmail(email)
//   //   .then((data) => {
//   //     if (data === null) {
//   //       res.json(true);
//   //     } else {
//   //       res.json(false);
//   //     }
//   //   })
//   //   .catch((err) => res.send(err));
//   let data = await userService.getOneByEmail(email);

//   if (data === null) {
//     res.json(true);
//   } else {
//     res.json(false);
//   }
// });

module.exports = route;
