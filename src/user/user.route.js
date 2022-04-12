const router = require("express").Router();
const userController = require("./user.controller");
const authMiddleware = require("../auth/auth.middleware");

router.post("/create", userController.createUserController);
router.get("/", authMiddleware, userController.findAllUserController);

module.exports = router;
