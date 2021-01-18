const Comment = require("../models/comment");
const Post = require("../models/posts");

module.exports = function (app) {
  // CREATE Comment
  app.post("/posts/:id/comments", function (req, res) {
    if (req.user){
      const comment = new Comment(req.body);
      comment.author = req.user._id;
      comment
        .save()
        .then((comment) => {
          return Post.findById(req.params.postId);
        })
        .then((post) => {
          post.comments.push(comment);
          return post.save();
        })
        .then((post) => {
          res.send(comment);
        })
        .catch((err) => {
          console.log(err);
          res.send("There was an error adding your comment :(")
        });
    } else {
      res.send("Login to add a comment.");
      return res.status(401);
    }
  });

  //get all comments from a post by postID
  app.get("/posts/:id/comments", (req, res) => {
    if (req.user) {
      Post.findOne({ _id: req.params.id })
        .populate("comments")
        .lean()
        .then((post) => {
          var comments = post['comments']
          res.json({ comments });
        })
        .catch((err) => {
          console.log(err.message);
          res.send("There was an error fetching comments :(")
        });
    } else {
      res.send("You must be logged in to view posts.");
      return res.status(401);
    }
  });
};
