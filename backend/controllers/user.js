const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// sign up user
exports.signup = (req, resp, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        resp.status(201).json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        resp.status(500).json({
          error: error,
        });
      });
  });
};
// login user
exports.login = (req, resp, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return resp.status(401).json({
          error: new Error("User not found!"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return resp.status(401).json({
              error: new Error("Incorrect password!"),
            });
          }
          const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          resp.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => {
          resp.status(500).json({
            error: error.message || error,
          });
        });
    })
    .catch((error) => {
      resp.status(500).json({
        error: error.message || error,
      });
    });
};
