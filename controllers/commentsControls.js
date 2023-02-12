const  commentSchema = require('../models/commentSchema')
const customError = require('../errors/customError')

const getComments = async (req, res)=>{
 const allComments =  await commentSchema.find({})
 if (allComments.length<1)
 {res.status(200).json({allComments:'be the first to comment', user:req.user})}
 else{res.status(200).json({allComments, user:req.user})}
  }
//post a comment

const postComment = async (req, res)=>{
// await commentSchema.appendUserIdAndUserName()
req.body.created_by_ID = req.user.userID
req.body.created_by = req.user.username
const comment = await commentSchema.create(req.body)
 if (!comment){throw (error)}
 res.status(201).json(comment)
}
//add a reply to a comment
const addReply = async (req, res)=>{
  req.body.created_by_ID = req.user.userID
  req.body.created_by = req.user.username
  const commentID = req.params.commentID
  const comment = await commentSchema.findOneAndUpdate({_id:commentID},{$push:{replies:req.body}},{new: true})
   if (!comment){throw (error)}
  res.status(200).json(comment)
}
const updateReply = async (req, res)=>{
  const replyID = req.params.replyID
  const comment = await commentSchema.findOne({'replies._id':replyID}) //returns  parent document
  const reply = comment.replies.id(replyID) //returns the subdocument object in the replies array with the specified repyID
  reply.set(req.body)
  await comment.save() // saves the parent document to updated properties
  if(!reply){throw (error)}
 res.status(200).json(reply)
  }//only allow for likes update, not texts
const updateComment = async (req, res)=>{
  const commentID = req.params.commentID
  const comment = await commentSchema.findOneAndUpdate({_id:commentID},req.body,{new: true})
if(!comment){throw(error)}
res.status(200).json(comment)
}//only allow for likes update, not texts
const deleteComment =  async (req, res)=>{
const commentID = req.params.commentID
 const comment= await commentSchema.findByIdAndDelete(commentID)
 if(!comment){throw(error)}
  res.status(200).json("deleted successfully")
}
const deleteReply = async (req, res)=>{
  const replyID = req.params.replyID
  const comment = await commentSchema.findOne({'replies._id':replyID}) //returns  parent document
  const reply = comment.replies.id(replyID) //returns the subdocument object in the replies array with the specified repyID
  if(!reply){throw(error)}
  reply.remove()
  await comment.save() // saves the parent document to updated properties
 res.status(200).json("reply deleted successfully")
 }

module.exports = {
  getComments,postComment,addReply,updateReply,updateComment,deleteComment,deleteReply
}