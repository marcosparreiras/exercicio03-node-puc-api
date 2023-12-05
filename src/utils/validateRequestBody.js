const AppError = require("./AppError");

function validateRequestBody(body, requiredParams) {
  if (!Array.isArray(requiredParams)) {
    throw new Error("requiredParams must be an array");
  }

  const missingParams = [];
  requiredParams.forEach((param) => {
    const paramIsIncluded = Object.keys(body).includes(param);

    if (!paramIsIncluded) {
      missingParams.push(param);
    }
  });

  if (missingParams.length > 0) {
    throw new AppError(
      `Missing in the request body: ${missingParams.join(", ")}`
    );
  }

  return body;
}

module.exports = validateRequestBody;
