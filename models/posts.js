const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  createdAt: { type: Date },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  //title: { type: String, required: true },
  url: { type: String, required: false },
  summary: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Likes" }],
  versionKey: false,
});

PostSchema.pre("save", function (next) {
  // SET createdAt
  this.createdAt = new Date();
  next();
});

module.exports = mongoose.model("Post", PostSchema);
