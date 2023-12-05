const InMemoryProductsRepository = require("../repositories/in-memory/in-memory-products-repository");
const UpdateProductService = require("./update-product-service");
const { randomUUID } = require("node:crypto");

let productsRepository;
let sut;

describe("UpdateProductService", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new UpdateProductService(productsRepository);
  });

  it("Should be able to update an existing product", async () => {
    const product = await productsRepository.create({
      name: "product 01",
      description: "fake product",
      price: 30.33,
      quantity: 4,
    });

    const updatedProduct = await sut.execute({
      productId: product.id,
      name: "Product 22",
      description: "fake product 22",
      price: 40.22,
      quantity: 6,
    });

    expect(updatedProduct).toEqual(
      expect.objectContaining({
        id: product.id,
        name: "Product 22",
        description: "fake product 22",
        price: 40.22,
        quantity: 6,
      })
    );
  });

  it("Should not be able to update a product with negative price", async () => {
    const product = await productsRepository.create({
      name: "product 01",
      description: "fake product",
      price: 30.33,
      quantity: 4,
    });

    await expect(() => {
      return sut.execute({
        productId: product.id,
        name: "product 01",
        description: "fake product",
        price: -10.45,
        quantity: 4,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should not be able to update a product with negative quantity", async () => {
    const product = await productsRepository.create({
      name: "product 01",
      description: "fake product",
      price: 30.33,
      quantity: 4,
    });

    await expect(() => {
      return sut.execute({
        productId: product.id,
        name: "product 01",
        description: "fake product",
        price: 10.45,
        quantity: -4,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should not be able to update a product with duplicate name", async () => {
    await productsRepository.create({
      name: "product 01",
      description: "fake product 01",
      price: 50.45,
      quantity: 3,
    });

    const product = await productsRepository.create({
      name: "product 02",
      description: "fake product",
      price: 30.33,
      quantity: 4,
    });

    await expect(() => {
      return sut.execute({
        productId: product.id,
        name: "product 01",
        description: "fake product",
        price: 30.33,
        quantity: 4,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should not be able to update an unexisting products", async () => {
    await expect(() => {
      return sut.execute({
        productId: randomUUID(),
        name: "product 01",
        description: "fake product",
        price: 30.33,
        quantity: 4,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
