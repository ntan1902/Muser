const Artist = require("../models/Artist");
const Category = require("../models/Category");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const SongPlaylist = require("../models/SongPlaylist");

const User = require("../models/User");
const ArtistSong = require("../models/ArtistSong");

const { Op } = require("sequelize");

const initPassport = require("../passport/passport");
const passport = require("passport");
const bcrypt = require("bcrypt");
initPassport(
  passport,
  async (email, password) => {
    try {
      var user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
          return user;
        }
      }
      else{
        return null
      }
    } catch (e) {
      return null;
    }
  },
  async (id) => {
    return User.findOne({
      where: {
        id: id,
      },
    });
  }
);