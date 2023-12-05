const CreateProductService = require("../create-product-service");
const KnexProductsRepository = require("../../repositories/knex/knex-products-repository");

function makeCreateProductService() {
  const productsRepository = new KnexProductsRepository();
  const service = new CreateProductService(productsRepository);
  return service;
}

module.exports = makeCreateProductService;
