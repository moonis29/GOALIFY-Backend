const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "MERN-GOAL-APP");
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        status: "Failed",
        error: "Not Authorized, No Token",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "Failed",
      error: "Invalid Token",
    });
  }
};

module.exports = { isAuthorized };
