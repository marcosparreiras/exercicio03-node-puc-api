const InMemoryProductsRepository = require("../repositories/in-memory/in-memory-products-repository");
const GetProductService = require("./get-product-service");
const { randomUUID } = require("node:crypto");

let productsRepository;
let sut;

describe("GetProductService", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new GetProductService(productsRepository);
  });

  it("Should be able to get an existing product", async () => {
    const product = await productsRepository.create({
      name: "Product 01",
      description: "Fake Product",
      price: 50.25,
      quantity: 3,
    });

    const fetchedProduct = await sut.execute({ productId: product.id });

    expect(fetchedProduct).toEqual({
      id: product.id,
      name: "Product 01",
      description: "Fake Product",
      price: 50.25,
      quantity: 3,
    });
  });

  it("Should not be able to get an unexisting product", async () => {
    await expect(() => {
      return sut.execute({ productId: randomUUID() });
    }).rejects.toBeInstanceOf(Error);
  });
});
