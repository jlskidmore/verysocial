const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  // SIGN UP FORM
  app.get("/register", (req, res) => {
    res.send("Reached the Registration page!");
  });

  // SIGN UP POST
  app.post("/register", (req, res) => {
    // Create User and JWT
    const user = new User(req.body);

    user
      .save()
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
          expiresIn: "60 days",
        });
        res.cookie("nToken", token, {
          maxAge: 900000,
          httpOnly: true,
          sameSite: "strict",
          secure: false,
        });
        res.send("Created new user!");
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(400).send({ err: err });
      });
  });

  // LOGIN FORM
  app.get("/login", (req, res) => {
    //res.send("Reached the LOGIN page");
  });

  // LOGIN
  app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Find this user name
    User.findOne({ username }, "username password")
      .then((user) => {
        if (!user) {
          // User not found
          return res.status(401).send({ message: "User not found!" });
        }
        // Check the password
        user.comparePassword(password, user.password, (err, isMatch) => {
          if (!isMatch) {
            // Password does not match
            res.status(401).send({ message: "Password is wrong!" });
            //.send({ message: "Password does not match!" });
          }
          // Create a token
          const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
            expiresIn: "60 days",
          });
          // Set a cookie and redirect to root
          res.cookie("nToken", token, {
            maxAge: 900000,
            httpOnly: true,
            sameSite: "strict",
            secure: false,
          });
          res.status(200).send({ message: "You've been logged in!" });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // LOGOUT
  app.get("/logout", (req, res) => {
    res.clearCookie("nToken");
    res.status(200).send({ message: "Logged out" });
  });
};
