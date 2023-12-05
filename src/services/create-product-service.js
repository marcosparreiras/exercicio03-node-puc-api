const AppError = require("../utils/AppError");

class CreateProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({ name, description, price, quantity }) {
    price = Number(price);
    quantity = parseInt(quantity);

    if (price < 0 || quantity < 0) {
      throw new AppError(
        "Could not have price or quantity with negative numbers"
      );
    }

    const existsProductWithSameName = await this.productsRepository.findByName(
      name
    );
    if (existsProductWithSameName) {
      throw new AppError("Product name already in use");
    }

    const product = await this.productsRepository.create({
      name,
      description,
      price,
      quantity,
    });

    return product;
  }
}

module.exports = CreateProductService;
