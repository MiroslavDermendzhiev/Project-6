const jwt = require("jsonwebtoken");

module.exports = (req, resp, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // getting the token from the http req header
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // verifies the token; decoding the token
    const userId = decodedToken.userId; // getting the user id from the token after it is decoded
    req.auth = { userId }; // storing the id in the req object so that the controller can use it 
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    resp.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
