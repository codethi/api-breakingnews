const router = require("express").Router();

const postController = require("./post.controller");
const authMiddleware = require("../auth/auth.middleware");

router.post("/create", authMiddleware, postController.createPostController);
router.get("/", authMiddleware, postController.findAllPostsController);
router.get("/search", authMiddleware, postController.searchPostController);
router.patch("/:id/like", authMiddleware, postController.likePostController);
router.patch(
  "/:id/comment",
  authMiddleware,
  postController.commentPostController
);

module.exports = router;
