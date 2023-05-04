import Post from "../models/Post.js";

function createPostRepository(title, banner, text, userId) {
  return Post.create({ title, banner, text, user: userId });
}

function findAllPostsRepository(offset, limit) {
  return Post.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user");
}

function topNewsRepository() {
  return Post.findOne().sort({ _id: -1 }).populate("user");
}

function findPostByIdRepository(id) {
  return Post.findById(id).populate("user");
}

function countPosts() {
  return Post.countDocuments();
}

function searchPostRepository(title) {
  return Post.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");
}

function findPostsByUserIdRepository(id) {
  return Post.find({
    user: id,
  })
    .sort({ _id: -1 })
    .populate("user");
}

function updatePostRepository(id, title, banner, text) {
  return Post.findOneAndUpdate(
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
}

function deletePostRepository(id) {
  return Post.findOneAndDelete({ _id: id });
}

function likesRepository(id, userId) {
  return Post.findOneAndUpdate(
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
}

function likesDeleteRepository(id, userId) {
  return Post.findOneAndUpdate(
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
}

function commentsRepository(id, message, userId) {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { idComment, userId, message, createdAt: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
}

function commentsDeleteRepository(id, userId, idComment) {
  return Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        comments: {
          idComment: idComment,
          userId: userId,
        },
      },
    }
  );
}

export default {
  createPostRepository,
  findAllPostsRepository,
  topNewsRepository,
  findPostByIdRepository,
  searchPostRepository,
  findPostsByUserIdRepository,
  updatePostRepository,
  deletePostRepository,
  likesRepository,
  likesDeleteRepository,
  commentsRepository,
  commentsDeleteRepository,
  countPosts,
};
