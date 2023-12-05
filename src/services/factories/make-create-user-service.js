const CreateUserService = require("../create-user-service");
const KnexUsersRepository = require("../../repositories/knex/knex-users-repository");

function makeCreateUserService() {
  const usersRepository = new KnexUsersRepository();
  const service = new CreateUserService(usersRepository);
  return service;
}

module.exports = makeCreateUserService;
