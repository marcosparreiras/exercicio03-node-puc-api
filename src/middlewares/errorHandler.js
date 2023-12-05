const AppError = require("../utils/AppError");

function errorHandler(error, _req, res, _next) {
  if (error instanceof AppError) {
    return res
      .status(error.status)
      .json({ status: "error", message: error.message });
  }
  console.log(error);
  return res
    .status(500)
    .json({ status: "error", message: "Internal server error" });
}

module.exports = errorHandler;
