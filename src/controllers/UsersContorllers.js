const jwt = require("jsonwebtoken");
const validateRequestBody = require("../utils/validateRequestBody");
const makeCreateUserService = require("../services/factories/make-create-user-service");
const makeAuthenticateUserService = require("../services/factories/make-authenticate-user-service");

class UsersControllers {
  // @Method POST
  // @Path /users
  async create(req, res) {
    const { name, email, password } = validateRequestBody(req.body, [
      "name",
      "email",
      "password",
    ]);

    const createUserService = makeCreateUserService();
    const user = await createUserService.execute({ name, email, password });

    delete user.password;
    return res.status(201).json({ user });
  }

  // @Method POST
  // @Path /users/session
  async createSession(req, res) {
    const { email, password } = validateRequestBody(req.body, [
      "email",
      "password",
    ]);

    const authenticateUserService = makeAuthenticateUserService();
    const user = await authenticateUserService.execute({ email, password });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({ token, user });
  }
}

module.exports = UsersControllers;
