const UpdateProductService = require("../update-product-service");
const KnexProductsRepository = require("../../repositories/knex/knex-products-repository");

function makeUpdateProductService() {
  const productsRepository = new KnexProductsRepository();
  const service = new UpdateProductService(productsRepository);
  return service;
}

module.exports = makeUpdateProductService;
