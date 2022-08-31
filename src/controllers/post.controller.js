const postService = require("../services/post.service");

const createPostController = async (req, res) => {
  try {
    const { title, banner, text } = req.body;

    if (!title || !banner || !text) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    const { id } = await postService.createPostService(
      title,
      banner,
      text,
      req.userId
    );

    return res.send({
      message: "Post created successfully!",
      post: { id, title, banner, text },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAllPostsController = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const posts = await postService.findAllPostsService(offset, limit);

    const total = await postService.countPosts();

    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (posts.length === 0) {
      return res.status(400).send({ message: "There are no posts" });
    }

    posts.shift(); // remove primeiro elemento da lista

    return res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: posts.map((post) => ({
        id: post._id,
        title: post.title,
        banner: post.banner,
        text: post.text,
        likes: post.likes,
        comments: post.comments,
        name: post.user.name,
        username: post.user.username,
        avatar: post.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const topNewsController = async (req, res) => {
  const post = await postService.topNewsService();
  
  if (!post) {
    return res.status(400).send({ message: "There is no registered post" });
  }
  return res.send({
    post: {
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    },
  });
};

const searchPostController = async (req, res) => {
  const { title } = req.query;

  const foundPosts = await postService.searchPostService(title);

  if (foundPosts.length === 0) {
    return res
      .status(400)
      .send({ message: "There are no posts with this title" });
  }

  return res.send({
    foundPosts: foundPosts.map((post) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  });
};

const findPostByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postService.findPostByIdService(id);

    return res.send({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findPostsByUserIdController = async (req, res) => {
  try {
    const id = req.userId;

    const posts = await postService.findPostsByUserIdService(id);

    return res.send({
      postsByUser: posts.map((post) => ({
        id: post._id,
        title: post.title,
        banner: post.banner,
        text: post.text,
        likes: post.likes,
        comments: post.comments,
        name: post.user.name,
        username: post.user.username,
        avatar: post.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updatePostController = async (req, res) => {
  try {
    const { title, banner, text } = req.body;
    const { id } = req.params;

    if (!title && !banner && !text) {
      res.status(400).send({
        message: "Submit at least one field to update the post",
      });
    }

    const post = await postService.findPostByIdService(id);

    if (post.user._id != req.userId) {
      return res.status(400).send({
        message: "You didn't create this post",
      });
    }

    await postService.updatePostService(id, title, banner, text);

    return res.send({ message: "Post successfully updated!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postService.findPostByIdService(id);

    if (post.user._id != req.userId) {
      return res.status(400).send({
        message: "You didn't create this post",
      });
    }

    await postService.deletePostService(id);

    return res.send({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const likePostController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const postLiked = await postService.likesService(id, userId);

  console.log(postLiked);

  if (postLiked.lastErrorObject.n === 0) {
    await postService.likesDeleteService(id, userId);
    return res.status(200).send({ message: "Like successfully removed" });
  }

  return res.send({
    message: "Like done successfully",
  });
};

const commentPostController = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  if (!message) {
    return res.status(400).send({ message: "Write a message to comment" });
  }

  await postService.commentsService(id, message, userId);

  return res.send({
    message: "Comment successfully completed!",
  });
};

const commentDeletePostController = async (req, res) => {
  const { id, idComment } = req.params;
  const userId = req.userId;

  await postService.commentsDeleteService(id, userId, idComment);

  return res.send({ message: "Comment successfully removed" });
};

module.exports = {
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
  commentDeletePostController
};
