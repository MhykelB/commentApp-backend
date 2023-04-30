const express = require("express");
const router = express.Router();
const {
  getComments,
  postComment,
  addReply,
  updateReply,
  updateComment,
  likeOrUnlike,
  deleteComment,
  deleteReply,
} = require("../controllers/commentsControls");

//  get all comments and replies
router.get("/", getComments);
// post a comment
router.post("/postcomment", postComment);
// post a reply
router.patch("/:commentID", addReply);
// add or remove a like
router.patch("/like/:commentID", likeOrUnlike);
//add a comment
router.patch("/updatecomment/:commentID", updateComment);
// update a reply
router.patch("/updatereply/:replyID", updateReply);
// delete a comment
router.delete("/:commentID", deleteComment);
// // router.route('/:commentID').patch(updateComment).delete(deleteComment)
router.delete("/deletereply/:replyID", deleteReply);
// // router.route('/:commentID').patch(updateComment).delete(deleteComment)

module.exports = router;
