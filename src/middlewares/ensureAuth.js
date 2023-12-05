const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function ensureAuth(req, _res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    throw new AppError("Not authorized");
  }
  const data = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = data.userId;
  next();
}

module.exports = ensureAuth;
