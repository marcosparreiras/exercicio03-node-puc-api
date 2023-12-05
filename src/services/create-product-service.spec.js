const InMemoryProductsRepository = require("../repositories/in-memory/in-memory-products-repository");
const CreateProductService = require("./create-product-service");

let productsRepository;
let sut;

describe("CreateProductService", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new CreateProductService(productsRepository);
  });

  it("Should be able to create a product", async () => {
    const product = await sut.execute({
      name: "product 01",
      description: "fake product",
      price: 30.33,
      quantity: 4,
    });
    expect(product.id).toEqual(expect.any(String));
  });

  it("Should not be able to create a product with negative price", async () => {
    await expect(() => {
      return sut.execute({
        name: "product 01",
        description: "fake product",
        price: -10.45,
        quantity: 4,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should not be able to create a product with negative quantity", async () => {
    await expect(() => {
      return sut.execute({
        name: "product 01",
        description: "fake product",
        price: 10.45,
        quantity: -4,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should not be able to create a product with duplicate name", async () => {
    const name = "product 01";
    await productsRepository.create({
      name,
      description: "fake product 01",
      price: 50.45,
      quantity: 3,
    });

    await expect(() => {
      return sut.execute({
        name,
        description: "fake product 02",
        price: 40.45,
        quantity: 4,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
