const AuthenticateUserService = require("../authenticate-user-service");
const KnexUsersRepository = require("../../repositories/knex/knex-users-repository");

function makeAuthenticateUserService() {
  const usersRepository = new KnexUsersRepository();
  const service = new AuthenticateUserService(usersRepository);
  return service;
}

module.exports = makeAuthenticateUserService;
