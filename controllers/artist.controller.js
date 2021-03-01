const express = require("express");
const route = express.Router();

const Artist = require("../models/Artist");
const Category = require("../models/Category");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const SongPlaylist = require("../models/SongPlaylist");

const User = require("../models/User");
const ArtistSong = require("../models/ArtistSong");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

route.get("/", async (req, res) => {
  // Artist.findAll()
  //   .then((artists) => res.send(artists))
  //   .catch((err) => res.send(err));
});
module.exports = route;
