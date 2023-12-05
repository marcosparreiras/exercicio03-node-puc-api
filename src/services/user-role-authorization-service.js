const AppError = require("../utils/AppError");

class UserRoleAuthorizationService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ userId, role }) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found");
    }

    if (user.role !== role) {
      throw new AppError("Not Authorized");
    }

    return true;
  }
}

module.exports = UserRoleAuthorizationService;
