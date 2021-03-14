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

service.getOneById = async (id) => {
  // return new Promise((resolve, reject) => {
  //   User.findOne({ where: { email: email } })
  //     .then((data) => resolve(data))
  //     .catch((err) => reject(new Error(err)));
  // });
  return await User.findOne({ where: { id: id } });
};

service.add = async (user) => {
  // return new Promise((resolve, reject) => {
  //   User.create(user)
  //     .then((data) => resolve(data))
  //     .catch((err) => reject(new Error(err)));
  // });
  return await User.create(user);
};

service.update = async (id, user) => {
  return await User.update(
    {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    { where: { id: id } }
  );
};

module.exports = service;
