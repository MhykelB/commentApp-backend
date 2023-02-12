const express =  require('express')
const router = express.Router()
const authMiddleWare = require('../middlware/authMiddleWare')
const {getComments,postComment,addReply,updateReply,updateComment,deleteComment,deleteReply} = require('../controllers/commentsControls')

//  get all comments and replies
router.get( '/',authMiddleWare, getComments)
// post a comment
router.post('/postcomment',postComment)
  // post a reply
router.patch('/:commentID', addReply)
//add a comment
router.patch('/updatecomment/:commentID', updateComment)
// update a reply
router.patch('/updatereply/:replyID',updateReply)
// delete a comment
router.delete('/:commentID', deleteComment)
// // router.route('/:commentID').patch(updateComment).delete(deleteComment)
router.delete('/deletereply/:replyID',deleteReply)
// // router.route('/:commentID').patch(updateComment).delete(deleteComment)

module.exports = router