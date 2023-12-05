const AppError = require("../utils/AppError");

class UpdateProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({ productId, name, description, price, quantity }) {
    price = Number(price);
    quantity = parseInt(quantity);

    if (price < 0 || quantity < 0) {
      throw new AppError(
        "Could not have price or quantity with negative numbers"
      );
    }

    const productExists = await this.productsRepository.findById(productId);
    if (!productExists) {
      throw new AppError("Product not found");
    }

    const existsProductWithSameName = await this.productsRepository.findByName(
      name
    );
    if (
      existsProductWithSameName &&
      existsProductWithSameName.id !== productId
    ) {
      throw new AppError("Product name already in use");
    }

    const product = await this.productsRepository.update({
      id: productId,
      name,
      description,
      price,
      quantity,
    });

    return product;
  }
}

module.exports = UpdateProductService;
