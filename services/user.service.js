const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = require("../models/User");
let service = {};

service.getAll = async () => {
  // return new Promise((resolve, reject) => {
  //   User.findAll({ attributes: ["id", "name", "email"] })
  //     .then((data) => resolve(data))
  //     .catch((err) => reject(new Error(err)));
  // });
  return await User.findAll({ attributes: ["id", "name", "email"] });
};

service.getOneByEmail = async (email) => {
  // return new Promise((resolve, reject) => {
  //   User.findOne({ where: { email: email } })
  //     .then((data) => resolve(data))
  //     .catch((err) => reject(new Error(err)));
  // });
  return await User.findOne({ where: { email: email } });
};

service.add = async (user) => {
  // return new Promise((resolve, reject) => {
  //   User.create(user)
  //     .then((data) => resolve(data))
  //     .catch((err) => reject(new Error(err)));
  // });
  return await User.create(user);
};

module.exports = service;
