import postService from "../services/post.service.js";

async function createPostController(req, res) {
  const { title, banner, text } = req.body;
  const userId = req.userId;

  try {
    const post = await postService.createPostService(
      { title, banner, text },
      userId
    );
    return res.status(201).send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findAllPostsController(req, res) {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const posts = await postService.findAllPostsService(
      limit,
      offset,
      currentUrl
    );
    return res.send(posts);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function topNewsController(req, res) {
  try {
    const post = await postService.topNewsService();
    return res.send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function searchPostController(req, res) {
  const { title } = req.query;

  try {
    const foundPosts = await postService.searchPostService(title);

    return res.send(foundPosts);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findPostByIdController(req, res) {
  const { id } = req.params;

  try {
    const post = await postService.findPostByIdService(id);
    return res.send(post);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

async function findPostsByUserIdController(req, res) {
  const id = req.userId;
  try {
    const posts = await postService.findPostsByUserIdService(id);
    return res.send(posts);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updatePostController(req, res) {
  const { title, banner, text } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    await postService.updatePostService(id, title, banner, text, userId);

    return res.send({ message: "Post successfully updated!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function deletePostController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await postService.deletePostService(id, userId);
    return res.send({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function likePostController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await postService.likePostService(id, userId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentPostController(req, res) {
  const { id: postId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await postService.commentPostService(postId, message, userId);

    return res.send({
      message: "Comment successfully completed!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentDeletePostController(req, res) {
  const { id: postId, idComment } = req.params;
  const userId = req.userId;

  try {
    await postService.commentDeletePostService(postId, userId, idComment);

    return res.send({ message: "Comment successfully removed" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export default {
  createPostController,
  findAllPostsController,
  topNewsController,
  searchPostController,
  findPostByIdController,
  findPostsByUserIdController,
  updatePostController,
  deletePostController,
  likePostController,
  commentPostController,
  commentDeletePostController,
};
