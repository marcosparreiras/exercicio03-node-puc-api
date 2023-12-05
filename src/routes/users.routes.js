const { Router } = require("express");
const UsersControllers = require("../controllers/UsersContorllers");

const usersRoutes = Router();
const usersContorllers = new UsersControllers();

usersRoutes.post("/", usersContorllers.create);
usersRoutes.post("/session", usersContorllers.createSession);

module.exports = usersRoutes;
