const FetchProductsService = require("../fetch-products-service");
const KnexProductsRepository = require("../../repositories/knex/knex-products-repository");

function makeFetchProductsService() {
  const productsRepository = new KnexProductsRepository();
  const service = new FetchProductsService(productsRepository);
  return service;
}

module.exports = makeFetchProductsService;
