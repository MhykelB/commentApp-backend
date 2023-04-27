const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    //include the id of the user who created it
    created_by_ID: { type: mongoose.Types.ObjectId, ref: "User" },
    created_by: { type: String },
    replied_to: { type: String, required: [true] },
    text: { type: String, maxlength: [100, "can't be more than 50 chracters"] },
    likes: [],
    type: { type: String, default: "reply" },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    //include the id of the user who created it
    created_by_ID: { type: mongoose.Types.ObjectId, ref: "User" },
    created_by: { type: String },
    text: {
      type: String,
      required: [true],
      maxlength: [100, "can't be more than 50 chracters"],
    },
    likes: [],
    replies: [replySchema],
    type: { type: String, default: "comment" },
  },
  { timestamps: true }
);
// ccreated by should be passed in from the auth middleware
// module.exports = replySchema
commentSchema.methods.appendUserIdAndUserName = async function (req, res) {
  this.created_by_ID = req.user.userID;
  this.created_by = req.user.username;
};
module.exports = mongoose.model("Comments", commentSchema);
console.log(module.exports);
