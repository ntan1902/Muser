// const Sequelize = require("sequelize");
// const mysqlConfig = require("../config/config.json").mysqlConfig;

// const sequelize = new Sequelize(mysqlConfig);

// module.exports = sequelize;
const firebase = require("firebase");
const firebaseConfig = require("../config/config.json").firebaseConfig;

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
