//import config from "./config/index";
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
port = process.env.PORT;

var checkAuth = (req, res, next) => {
  //console.log("Checking authentication");
  if (
    typeof req.cookies.nToken === "undefined" ||
    req.cookies.nToken === null
  ) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
};
/* var corsOptions = {
  origin: "http://localhost:5000",
  credentials: true,
}; */

//app.use(cors(corsOptions));
app.use(cors());

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());
app.use(cookieParser());
app.use(checkAuth);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  } else {
    next();
  }
});

// Set db
require("./data/db");

// all routes
require("./controllers/posts")(app);
require("./controllers/comments.js")(app);
require("./controllers/auth.js")(app);

// start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
