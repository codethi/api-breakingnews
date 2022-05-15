const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validId } = require("../middlewares/global.middleware");

router.post("/create", userController.createUserController);
router.get("/", authMiddleware, userController.findAllUserController);
router.get(
  "/findById/:id?",
  authMiddleware,
  validId,
  userController.findUserByIdController
);
router.patch(
  "/update/:id",
  validId,
  authMiddleware,
  userController.updateUserController
);

module.exports = router;
