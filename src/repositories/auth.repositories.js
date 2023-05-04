import User from "../models/User.js";

const loginRepository = (email) =>
  User.findOne({ email: email }).select("+password");

export default { loginRepository };
