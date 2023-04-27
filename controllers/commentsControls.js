const commentSchema = require("../models/commentSchema");
const customError = require("../errors/customError");

const getComments = async (req, res) => {
  const allComments = await commentSchema.find({});
  if (allComments.length < 1) {
    res
      .status(200)
      .json({ allComments: "be the first to comment", user: req.user });
  } else {
    res.status(200).json({ allComments, user: req.user });
  }
};
//post a comment

const postComment = async (req, res) => {
  // await commentSchema.appendUserIdAndUserName()
  req.body.created_by_ID = req.user.userID;
  req.body.created_by = req.user.username;
  const comment = await commentSchema.create(req.body);
  if (!comment) {
    throw error;
  }
  res.status(201).json(comment);
};
//add a reply to a comment
const addReply = async (req, res) => {
  req.body.created_by_ID = req.user.userID;
  req.body.created_by = req.user.username;
  const commentID = req.params.commentID;
  const comment = await commentSchema.findOneAndUpdate(
    { _id: commentID },
    { $push: { replies: req.body } },
    { new: true }
  );
  if (!comment) {
    throw error;
  }
  res.status(200).json(comment);
};
const likeOrUnlike = async (req, res) => {
  const { userID, duty } = req.body;
  const commentID = req.params.commentID;
  if (duty === "comment") {
    let comment = await commentSchema.findOne({ _id: commentID });

    const ifLikes = comment.likes.includes(userID);
    if (ifLikes) {
      const removeLike = comment.likes.filter((likesID) => {
        return likesID !== userID;
      });
      comment.set({ likes: removeLike });
      comment = await comment.save();
      console.log(comment.likes);
      if (!comment) {
        throw error;
      }
      return res.status(200).json(comment);
    } else {
      let comment = await commentSchema.findOne({ _id: commentID });
      const addLike = comment.likes.concat(userID);
      comment.set({ likes: addLike });
      comment = await comment.save();
      console.log(comment.likes);
      if (!comment) {
        throw error;
      }
      return res.status(200).json(comment);
    }
  } else if (duty === "reply") {
    let parentComment = await commentSchema.findOne({
      "replies._id": commentID,
    });
    const reply = parentComment.replies.id(commentID); //returns the subdocument object in the replies array with the specified repyID
    const ifLikes = reply.likes.includes(userID);
    console.log(ifLikes);
    if (ifLikes) {
      const removeLike = reply.likes.filter((likesID) => {
        return likesID !== userID;
      });
      reply.set({ likes: removeLike });
      parentComment = await parentComment.save();
      if (!parentComment) {
        throw error;
      }
      return res.status(200).json(parentComment);
    } else {
      const addLike = reply.likes.concat(userID);
      reply.set({ likes: addLike });
      parentComment = await parentComment.save();
      if (!parentComment) {
        throw error;
      }
      return res.status(200).json(parentComment);
    }
  } else {
    throw error;
  }
};

const updateReply = async (req, res) => {
  const replyID = req.params.replyID;
  let comment = await commentSchema.findOne({ "replies._id": replyID }); //returns  parent document
  const reply = comment.replies.id(replyID); //returns the subdocument object in the replies array with the specified repyID
  reply.set(req.body);
  comment = await comment.save(); // saves the parent document to updated properties
  if (!reply) {
    throw error;
  }
  res.status(200).json(comment);
}; //only allow for likes update, not texts
const updateComment = async (req, res) => {
  const commentID = req.params.commentID;
  const comment = await commentSchema.findOneAndUpdate(
    { _id: commentID },
    req.body,
    { new: true }
  );
  if (!comment) {
    throw error;
  }
  res.status(200).json(comment);
}; //only allow for likes update, not texts
const deleteComment = async (req, res) => {
  const commentID = req.params.commentID;
  const comment = await commentSchema.findByIdAndDelete(commentID);
  if (!comment) {
    throw error;
  }
  res.status(200).json({
    message: " comment deleted successfully",
    comment,
    type: "comment",
  });
};
const deleteReply = async (req, res) => {
  const replyID = req.params.replyID;
  let comment = await commentSchema.findOne({ "replies._id": replyID }); //returns  parent document
  const reply = comment.replies.id(replyID); //returns the subdocument object in the replies array with the specified repyID
  if (!reply) {
    throw error;
  }
  reply.remove();
  comment = await comment.save(); // saves the parent document to updated properties
  res.status(200).json({
    message: "reply deleted successfully",
    comment,
    type: "reply",
  });
};

module.exports = {
  getComments,
  postComment,
  addReply,
  updateReply,
  updateComment,
  likeOrUnlike,
  deleteComment,
  deleteReply,
};
