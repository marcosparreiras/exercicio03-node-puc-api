const UserRoleAuthorizationService = require("../user-role-authorization-service");
const KnexUsersRepository = require("../../repositories/knex/knex-users-repository");

function makeUserRoleAuthorizationService() {
  const usersRepository = new KnexUsersRepository();
  const service = new UserRoleAuthorizationService(usersRepository);
  return service;
}

module.exports = makeUserRoleAuthorizationService;
