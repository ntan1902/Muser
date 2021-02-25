const Sequelize = require("sequelize");
const mysqlConfig = require("../config/config.json").mysqlConfig;

const sequelize = new Sequelize(mysqlConfig);

module.exports = sequelize;
