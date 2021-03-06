
const Artist = require("../models/Artist");
const Category = require("../models/Category");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const SongPlaylist = require("../models/SongPlaylist");

const User = require("../models/User");
const ArtistSong = require("../models/ArtistSong");

const {Op} = require("sequelize");

const initializePassport = require("../middlewares/passport")
const passport = require('passport')
const bcrypt = require("bcrypt")
initializePassport(
    passport,
    async (email, password) => {
        try {
            var user = await User.findAll({
                where:{
                    email:{
                        [Op.eq]: email
                    },
                }
            })
            if(user){
                const valid = bcrypt.compare(password,user.password)
                if(valid){
                    return user
                }
            }
            return user
        } catch (e) {
            return null;
        }
    },
    async (id) => {
        return User.findAll({
            where:{
                id:{
                    [Op.eq]: id
                }
            }
        })
    }
);