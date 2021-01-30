const User = require("../models/user");

module.exports = (app) => {
  // FOLLOW AN ACCOUNT
  app.put("/user/:id/follow", function (req, res) {
    if (req.user) {
      User.findByIdAndUpdate({ _id: req.params.id }).then((user) => {
        //check if following
        // if yes, unfollow. if not, add follow
        if (user.followers.includes(req.user._id)) {
          user.followers.pull(req.user);
        } else {
          user.followers.unshift(req.user._id);
        }
        return user.save();
      });
      // update signed-in users following
      User.findByIdAndUpdate({ _id: req.user._id })
        .then((user) => {
          //check if following
          // if yes, unfollow. if not, add follow
          if (user.following.includes(req.params.id)) {
            user.following.pull(req.params.id);
          } else {
            user.following.unshift(req.params.id);
          }
          res.send("Success!");
          res.status(204);
          return user.save();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      res.send("You must be logged to follow an account.");
      return res.status(401);
    }
  });
};
