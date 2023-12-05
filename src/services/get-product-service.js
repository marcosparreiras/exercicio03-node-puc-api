const AppError = require("../utils/AppError");

class GetProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({ productId }) {
    const product = await this.productsRepository.findById(productId);
    if (!product) {
      throw new AppError("Product not found");
    }
    return product;
  }
}

module.exports = GetProductService;
