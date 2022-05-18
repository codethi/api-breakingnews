require("dotenv").config();
const authService = require("../services/auth.service");
const bcrypt = require("bcryptjs");

const loginController = async (req, res) => {
    const {email, password} = req.body;

    const user = await authService.loginService(email);

    if(!user) {
        return res.status(400).send({message: "User not found"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).send({message: "Invalid password"})
    }

    const token = authService.generateToken(user.id);


    res.send({token});
}

module.exports = {loginController}
