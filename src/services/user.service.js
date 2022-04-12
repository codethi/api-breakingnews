const User = require("../models/User");

const findByEmailUserService = (email) => User.findOne({ email: email });

const createUserSevice = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

const updateUserService = (id, name, username, email, password, avatar) =>
  User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name,
      username,
      email,
      password,
      avatar,
    },
    {
      rawResult: true,
    }
  );

module.exports = {
  findByEmailUserService,
  createUserSevice,
  findAllUserService,
  findByIdUserService,
  updateUserService,
};
