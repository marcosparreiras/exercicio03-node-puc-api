const { Router } = require("express");
const ProductsControllers = require("../controllers/ProductsControllers");
const ensureAuth = require("../middlewares/ensureAuth");
const roleProtect = require("../middlewares/roleProtect");

const productsRoutes = Router();
const productsControllers = new ProductsControllers();

productsRoutes.use(ensureAuth);
productsRoutes.get("/", productsControllers.index);
productsRoutes.get("/:id", productsControllers.show);

productsRoutes.use(roleProtect("admin"));
productsRoutes.post("/", productsControllers.create);
productsRoutes.put("/:id", productsControllers.update);
productsRoutes.delete("/:id", productsControllers.delete);

module.exports = productsRoutes;
