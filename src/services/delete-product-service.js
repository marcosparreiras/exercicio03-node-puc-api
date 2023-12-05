const AppError = require("../utils/AppError");

class DeleteProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({ productId }) {
    const productExists = await this.productsRepository.findById(productId);
    if (!productExists) {
      throw new AppError("Product not found");
    }
    await this.productsRepository.delete(productId);
    return true;
  }
}

module.exports = DeleteProductService;
