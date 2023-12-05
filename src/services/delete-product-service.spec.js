const InMemoryProductsRepository = require("../repositories/in-memory/in-memory-products-repository");
const DeleteProductService = require("./delete-product-service");
const { randomUUID } = require("node:crypto");

let productsRepository;
let sut;

describe("DeleteProductService", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new DeleteProductService(productsRepository);
  });

  it("Should be able to delete an existing product", async () => {
    const product = await productsRepository.create({
      name: "product 01",
      description: "fake product",
      price: 30.33,
      quantity: 4,
    });

    const isDeleted = await sut.execute({ productId: product.id });

    expect(isDeleted).toEqual(true);
  });

  it("Should not be able to delete an unexisting product", async () => {
    await expect(() => {
      return sut.execute({ productId: randomUUID() });
    }).rejects.toBeInstanceOf(Error);
  });
});
