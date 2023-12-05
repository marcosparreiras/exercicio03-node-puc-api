const { Router } = require("express");
const usersRoutes = require("./users.routes");
const productsRoutes = require("./products.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/products", productsRoutes);
routes.use((_req, res) => {
  return res.status(404).json({ status: "Error", message: "Not found" });
});

module.exports = routes;
