const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class AuthenticateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid credentials");
    }
    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      throw new AppError("Invalid credentials");
    }
    return user;
  }
}

module.exports = AuthenticateUserService;
