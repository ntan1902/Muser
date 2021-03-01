const Sequelize = require("sequelize");
const db = require("../database/db");

//	`id` int not null auto_increment primary key,
//  `name` varchar(20) not null

const Category = db.define("category", {
  name: {
    type: Sequelize.STRING,
  },
});

Category.associate = function (models) {
  Category.hasMany(models.Song, { foreignKey: "category_id" });
};

// Category.sync().then(() => {
//   console.log("Table `Categories` created");
// });
module.exports = Category;
