require("dotenv").config();
const jwt = require("jsonwebtoken");
const { findByIdUserService } = require("../services/user.service");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "The token was not informed!" });
  }

  const parts = authHeader.split(" "); /* ["Bearer", "asdasdasdadsadasd"] */

  if (parts.length !== 2) {
    return res.status(401).send({ message: "Invalid token!" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: "Malformatted Token!" });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    
    if(err) {
      console.error(err);
      return res.status(401).send({ message: "Invalid token!" });
    }

    const user = await findByIdUserService(decoded.id);

    if (!user || !user.id) {
      return res.status(401).send({ message: "Invalid token!" });
    }

    req.userId = user.id;

    return next();
  });
};
