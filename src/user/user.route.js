const router = require("express").Router();
const userController = require("./user.controller");
const authMiddleware = require("../auth/auth.middleware");
const { validId } = require("./user.middleware");

router.post("/create", userController.createUserController);
router.get("/", authMiddleware, userController.findAllUserController);
router.get(
  "/:id",
  validId,
  authMiddleware,
  userController.findUserByIdController
);

module.exports = router;
