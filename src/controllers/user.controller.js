const userService = require("../services/user.service");
const authService = require("../services/auth.service");

const createUserController = async (req, res) => {
  const { name, username, email, password, avatar } = req.body;

  if (!username || !name || !email || !password || !avatar) {
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
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({
      message: "Send an id in the parameters to search for the user",
    });
  }

  const user = await userService.findByIdUserService(id);

  res.send(user);
};

module.exports = {
  createUserController,
  findAllUserController,
  findUserByIdController,
};
