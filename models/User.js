const Sequelize = require("sequelize");
const sequelize = require("../database/db");
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
  is_admin: {
    type: Sequelize.BOOLEAN,
  },
});

User.associate = function (models) {
  User.hasMany(models.Playlist, { foreignKey: "user_id" });
};

/*Find by ID*/
// User.findByPk(1)
//   .then((user) => {
//     console.log(user.get({ plain: true }));
//     console.log("**********************");
//     console.log(`id: ${user.id}, name: ${user.name}`);
//   })
//   .finally(() => {
//     sequelize.close();
//   });

// User.findAll({raw:true})
//   .then((users) => console.log(users));

// User.create({
//   name:"test2",
//   email:"test2@gmail.com",
//   password:"123"
// })

// User.sync().then(() => {
//   console.log("Table `Users` created");
// }).finally(() => {
//   sequelize.close();
// })
module.exports = User;
