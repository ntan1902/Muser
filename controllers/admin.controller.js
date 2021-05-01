const express = require("express");
const route = express.Router();
const checkAuthen = require("../authentication/check")
const db = require("../database/db");
route.get("/", checkAuthen, async ( req, res)=>{

  const cates = db.database().ref("Categories/")
  const songs = db.database().ref("Songs/")
  const test = db.database().ref("Songs/").orderByChild("createdAt").limitToLast(10);
  const users = db.database().ref("Users/")
  let NumUser = 0;
  var activeUsers =0;
  var NumCate = 0;
  var NumSongs = 0;
  var songsArr = [];
  cates.on("value",async (snapshot)=>{
    const data = Object.values(snapshot.val());
    NumCate = data.length
  })
  songs.on("value",async (snapshot)=>{
    const data = Object.values(snapshot.val());
    NumSongs = data.length
  })
  users.on("value",async (snapshot)=>{
    const data = Object.values(snapshot.val());
    NumUser = data.length
    activeUsers = data.filter(user=> user.status ==="online").length
  })
  await test.on("value",async (snapshot)=>{
    // songsArr.map((song,index) => ({...song, order: index+1}))
    let i = 1;
    for(let song of Object.values(snapshot.val())){
      let categoryRef = db.database().ref("/Categories/" + song.categoryId);
      let artistRef = db.database().ref("/Artists/" + song.artistId);

      await categoryRef.on("value", (snapshot) => {
        let category = snapshot.val();
        song.category = category.name;
      });
      await artistRef.on("value", (snapshot) => {
        let artist = snapshot.val();
        song.artist = artist.name;
      });
      song["order"] = i
      songsArr.push(song)
      i++
     }
    res.render("vwAdmin/index", {
      layout: "main.hbs",
      checked: true,
      cates: NumCate,
      NumUser: NumUser,
      songs: NumSongs,
      activeUsers,
      songsArr
    });
  })
});

module.exports = route;
