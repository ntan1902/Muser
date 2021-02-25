const Sequelize = require("sequelize");
const db = require("../database/db");

// `id` int not null auto_increment primary key,
// `content` text not null,
// `created_at` date default null,
// `updated_at`date default null,
// `song_id` int not null,
// `user_id` int not null,
// 	CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) on delete cascade,
// 	CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) on delete cascade
const Review = db.define("Review", {
  content: {
    type: Sequelize.STRING,
  },
});

Review.associate = function (models) {
  Review.belongsTo(models.Song, { foreignKey: "song_id" });
  Review.belongsTo(models.User, { foreignKey: "user_id" });
};

Review.sync().then(() => {
  console.log("Table `Reviews` created");
});
module.exports = Review;
