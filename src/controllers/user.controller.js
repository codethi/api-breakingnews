const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const bcrypt = require("bcryptjs");

const createUserController = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  if (!username || !name || !email || !password || !avatar || !background) {
    return res.status(400).send({
      message: "Submit all fields for registration",
    });
  }

  const foundUser = await userService.findByEmailUserService(email);

  if (foundUser) {
    return res.status(400).send({
      message: "User already exists",
    });
  }

  const user = await userService
    .createUserSevice(req.body)
    .catch((err) => console.log(err.message));

  if (!user) {
    return res.status(400).send({
      message: "Error creating User",
    });
  }

  const token = authService.generateToken(user.id);

  res.status(201).send({
    user: {
      id: user.id,
      name,
      username,
      email,
      avatar,
      background
    },
    token,
  });
};

const findAllUserController = async (req, res) => {
  const users = await userService.findAllUserService();

  if (users.length === 0) {
    return res.status(400).send({
      message: "There are no registered users",
    });
  }

  res.send(users);
};

const findUserByIdController = async (req, res) => {
  let idParam;
  if (!req.params.id) {
    req.params.id = req.userId;
    idParam = req.params.id;
  } else {
    idParam = req.params.id;
  }
  if (!idParam) {
    return res.status(400).send({
      message: "Send an id in the parameters to search for the user",
    });
  }

  const user = await userService.findByIdUserService(idParam);

  res.send(user);
};

const updateUserController = async (req, res) => {
  try {
    let { name, username, email, password, avatar, background } = req.body;
    const { id } = req.params;

    if (!name && !username && !email && !password && !avatar && !background) {
      res.status(400).send({
        message: "Submit at least one field to update the user",
      });
    }

    const user = await userService.findByIdUserService(id);

    if (user._id != req.userId) {
      return res.status(400).send({
        message: "You cannot update this user",
      });
    }

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    await userService.updateUserService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );

    return res.send({ message: "User successfully updated!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createUserController,
  findAllUserController,
  findUserByIdController,
  updateUserController,
};
