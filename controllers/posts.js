const Post = require("../models/posts");
const User = require("../models/user");

module.exports = (app) => {

  app.get("/", (req,res)=>{
    res.send("Hello there!");
  });
  // CREATE
  app.post("/posts/new", (req, res) => {
    if (req.user) {
      var post = new Post(req.body);
      post.author = req.user._id;
      post.likes = [];

      post
        .save()
        .then((post) => {
          return User.findById(req.user._id);
        })
        .then((user) => {
          user.posts.unshift(post);
          user.save();
          res.send(`Post added! You can find it by ID at ${post._id}`);
        })
        .catch((err) => {
          console.log(err.message);
          res.send("There was an error in creating your post :(")
        });
    } else {
      res.send("Login to make a post!");
      return res.status(401); // UNAUTHORIZED
    }
  });

  // GET ALL POSTS
  app.get("/posts", (req, res) => {
    if (req.user) {
      Post.find({})
        .populate("author")
        .populate("comments")
        .lean()
        .then((posts) => {
          res.json({ posts });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      res.send("You must be logged in to view posts.");
      return res.status(401);
    }
  });

  // GET A SINGLE POST BY ID
  app.get("/posts/:id", (req, res) => {
    if (req.user) {
      Post.findOne({ _id: req.params.id })
        .populate("author")
        .populate("comments")
        .lean()
        .then((post) => {
          res.json({ post });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      res.send("You must be logged in to view posts.");
      return res.status(401);
    }
  });

  // ADD OR REMOVE A LIKE TO A POST
  app.put("/posts/:id/like", (req, res) => {
    if (req.user) {
      Post.findByIdAndUpdate({ _id: req.params.id })
        .then((post) => {
          //console.log(req.user._id);
          if (post.likes.includes(req.user._id)) {
            post.likes.pull(req.user);
            res.send(`REMOVED a like from ${req.user._id}` + post.likes);
          } else {
            post.likes.unshift(req.user);
            res.send(`ADDED a like from ${req.user._id}`);
          }
          return post.save();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      res.send("You must be logged in to add a like to a post.");
      return res.status(401);
    }
  });
};
