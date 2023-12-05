const InMemoryProductsRepository = require("../repositories/in-memory/in-memory-products-repository");
const FetchProductsService = require("./fetch-products-service");
const { randomUUID } = require("node:crypto");

let productsRepository;
let sut;

describe("FetchProductsService", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new FetchProductsService(productsRepository);
  });

  it("Should be able to fetch all products", async () => {
    for (let i = 1; i <= 22; i++) {
      await productsRepository.create({
        name: `Product ${i}`,
        description: "fake product",
        price: 30.33,
        quantity: 4,
      });
    }

    const products = await sut.execute({ search: "" });

    expect(products).toHaveLength(22);
    expect(products[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      price: expect.any(Number),
      quantity: expect.any(Number),
    });
  });

  it("Should be able to fetch searched products by name", async () => {
    await productsRepository.create({
      name: `laptop 1`,
      description: "fake product",
      price: 30.33,
      quantity: 4,
    });

    await productsRepository.create({
      name: `laptop 2`,
      description: "fake product",
      price: 30.33,
      quantity: 4,
    });

    await productsRepository.create({
      name: `product 1`,
      description: "fake product",
      price: 30.33,
      quantity: 4,
    });

    const products = await sut.execute({ search: "laptop" });

    expect(products).toHaveLength(2);
  });

  it("Should be able to fetch searched products by description", async () => {
    await productsRepository.create({
      name: `laptop 1`,
      description: "fake product",
      price: 30.33,
      quantity: 4,
    });

    await productsRepository.create({
      name: `laptop 2`,
      description: "fake product",
      price: 30.33,
      quantity: 4,
    });

    await productsRepository.create({
      name: `product 1`,
      description: "fake product 01",
      price: 30.33,
      quantity: 4,
    });

    const products = await sut.execute({ search: "01" });

    expect(products).toHaveLength(1);
  });
});
