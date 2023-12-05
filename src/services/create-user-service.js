const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class CreateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password }) {
    if (password.length < 6) {
      throw new AppError("Password must have at lest 6 characters");
    }

    const existsUserWithSameEmail = await this.usersRepository.findByEmail(
      email
    );
    if (existsUserWithSameEmail) {
      throw new AppError("E-mail already in use");
    }

    const password_hash = await hash(password, 6);
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return user;
  }
}

module.exports = CreateUserService;
