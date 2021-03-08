const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = require("../models/User");
let service = {};

service.getAll = () => {
  return new Promise((resolve, reject) => {
    User.findAll({ attributes: ["id", "name", "email"] })
      .then((data) => resolve(data))
      .catch((err) => reject(new Error(err)));
  });
};

service.getOneByEmail = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { email: email } })
      .then((data) => resolve(data))
      .catch((err) => reject(new Error(err)));
  });
};

service.add = (user) => {
  return new Promise((resolve, reject) => {
    User.create(user)
      .then((data) => resolve(data))
      .catch((err) => reject(new Error(err)));
  });
};

module.exports = service;
