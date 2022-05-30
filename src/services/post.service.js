const Post = require("../models/Post");

const createPostService = (title, banner, text, userId) =>
  Post.create({ title, banner, text, user: userId });

const findAllPostsService = (offset, limit) =>
  Post.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const topNewsService = () => Post.findOne().sort({ _id: -1 }).populate("user");

const findPostByIdService = (id) => Post.findById(id).populate("user");

const countPosts = () => Post.countDocuments();

const searchPostService = (title) =>
  Post.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

const findPostsByUserIdService = (id) => {
  return Post.find({
    user: id,
  })
    .sort({ _id: -1 })
    .populate("user");
};

const updatePostService = (id, title, banner, text) =>
  Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title,
      banner,
      text,
    },
    {
      rawResult: true,
    }
  );

const deletePostService = (id) => Post.findOneAndDelete({ _id: id });

const likesService = (id, userId) =>
  Post.findOneAndUpdate(
    {
      _id: id,
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

const likesDeleteService = (id, userId) =>
  Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        likes: {
          userId: userId,
        },
      },
    }
  );

const commetsService = (id, message, userId) =>
  Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { userId, message, createdAt: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

module.exports = {
  createPostService,
  findAllPostsService,
  topNewsService,
  findPostByIdService,
  searchPostService,
  findPostsByUserIdService,
  updatePostService,
  deletePostService,
  likesService,
  likesDeleteService,
  commetsService,
  countPosts,
};
