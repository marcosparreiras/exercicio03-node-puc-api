const makeUserRoleAuthorizationService = require("../services/factories/make-user-role-authorization-service");

function roleProtect(role) {
  return async (req, _res, next) => {
    userRoleAuthorizationService = makeUserRoleAuthorizationService();
    await userRoleAuthorizationService.execute({
      userId: req.userId,
      role,
    });
    next();
  };
}

module.exports = roleProtect;
