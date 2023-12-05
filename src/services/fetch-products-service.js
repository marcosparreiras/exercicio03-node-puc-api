class FetchProductsService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({ search }) {
    const products = await this.productsRepository.findAll(search);
    return products;
  }
}

module.exports = FetchProductsService;
