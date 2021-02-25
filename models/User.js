const Sequelize = require("sequelize");
const db = require("../database/db");

// `id` int not null auto_increment primary key,
// `name` varchar(20) not null,
// `email` varchar(50) not null,
// `password` varchar(20) not null,
// `avatar` text default null,
// `role` varchar(10) default null

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  avatar: {
    type: Sequelize.TEXT,
  },
  role: {
    type: Sequelize.STRING,
  },
});

User.associate = function (models) {
  User.hasMany(models.Playlist, { foreignKey: "user_id" });
  User.hasMany(models.Review, { foreignKey: "user_id" });
};

User.sync().then(() => {
  console.log("Table `Users` created");
});
module.exports = User;
