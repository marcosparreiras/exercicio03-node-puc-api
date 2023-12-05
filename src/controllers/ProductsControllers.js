const validateRequestBody = require("../utils/validateRequestBody");
const makeCreateProductService = require("../services/factories/make-create-product-service");
const makeFetchProductsService = require("../services/factories/make-fetch-products-service");
const makeGetProductService = require("../services/factories/make-get-product-service");
const makeUpdateProductService = require("../services/factories/make-update-product-service");
const makeDeleteProductService = require("../services/factories/make-delete-product-service");

class ProductsControllers {
  // @Method GET
  // @Path /products
  async index(req, res) {
    const { search } = req.query;
    const fetchProductsService = makeFetchProductsService();
    const products = await fetchProductsService.execute({ search });
    return res.status(200).json({ total: products.length, products });
  }

  // @Method GET
  // @Path /products/:id
  async show(req, res) {
    const { id } = req.params;
    const getProductService = makeGetProductService();
    const product = await getProductService.execute({ productId: id });
    return res.status(200).json({ product });
  }

  // @Method POST
  // @Path /products
  async create(req, res) {
    const { name, description, price, quantity } = validateRequestBody(
      req.body,
      ["name", "description", "price", "quantity"]
    );
    const createProductService = makeCreateProductService();
    const product = await createProductService.execute({
      name,
      description,
      price,
      quantity,
    });
    return res.status(201).json({ product });
  }

  // @Method PUT
  // @Path /products/:id
  async update(req, res) {
    const { id } = req.params;
    const { name, description, price, quantity } = validateRequestBody(
      req.body,
      ["name", "description", "price", "quantity"]
    );
    const updateProductService = makeUpdateProductService();
    const product = await updateProductService.execute({
      productId: id,
      name,
      description,
      price,
      quantity,
    });
    return res.status(200).json({ product });
  }

  // @Method DELETE
  // @Path /products/:id
  async delete(req, res) {
    const { id } = req.params;
    const deleteProductService = makeDeleteProductService();
    await deleteProductService.execute({ productId: id });
    return res.status(204).json();
  }
}

module.exports = ProductsControllers;
