const DeleteProductService = require("../delete-product-service");
const KnexProductsRepository = require("../../repositories/knex/knex-products-repository");

function makeDeleteProductService() {
  const productsRepository = new KnexProductsRepository();
  const service = new DeleteProductService(productsRepository);
  return service;
}

module.exports = makeDeleteProductService;
