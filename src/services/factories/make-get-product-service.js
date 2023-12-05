const GetProductService = require("../get-product-service");
const KnexProductsRepository = require("../../repositories/knex/knex-products-repository");

function makeGetProductService() {
  const productsRepository = new KnexProductsRepository();
  const service = new GetProductService(productsRepository);
  return service;
}

module.exports = makeGetProductService;
