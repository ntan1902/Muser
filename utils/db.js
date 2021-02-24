const Sequelize = require("sequelize");
const mysqlConfig = require("../config/default.json").mysqlConfig;

const sequelize = new Sequelize(mysqlConfig);

module.exports = sequelize;
