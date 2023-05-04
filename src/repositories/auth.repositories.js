import User from "../models/User";

const loginRepository = (email) =>
  User.findOne({ email: email }).select("+password");

export default { loginRepository };
