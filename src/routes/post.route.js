const router = require("express").Router();

const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validId } = require("../middlewares/global.middleware");

router.post("/create", authMiddleware, postController.createPostController);
router.get("/", postController.findAllPostsController);
router.get("/top", postController.topNewsController);
router.get("/search", postController.searchPostController);
router.get(
  "/byIdPost/:id",
  validId,
  authMiddleware,
  postController.findPostByIdController
);
router.get(
  "/byUserId",
  authMiddleware,
  validId,
  postController.findPostsByUserIdController
);
router.patch(
  "/update/:id",
  validId,
  authMiddleware,
  postController.updatePostController
);
router.delete(
  "/delete/:id",
  validId,
  authMiddleware,
  postController.deletePostController
);
router.patch(
  "/:id/like",
  validId,
  authMiddleware,
  postController.likePostController
);
router.patch(
  "/:id/comment",
  validId,
  authMiddleware,
  postController.commentPostController
);

module.exports = router;
