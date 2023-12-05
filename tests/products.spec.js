const { execSync } = require("node:child_process");
const app = require("../src/app");
const request = require("supertest");
const kenx = require("../src/libs/knex");

describe("Products routes", () => {
  beforeEach(() => {
    execSync("npx knex migrate:rollback --all");
    execSync("npx knex migrate:latest");
    execSync("npx knex seed:run");
  });

  afterAll((done) => {
    const server = app.listen(3000, () => {
      kenx.destroy();
      server.close(done);
    });
  });

  it("User without token should not be able do fetch products", async () => {
    const response = await request(app).get("/products");

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({
      status: "error",
      message: expect.any(String),
    });
  });

  it("User should be able do fetch products", async () => {
    const loginResonse = await request(app).post("/users/session").send({
      email: "user@test.com",
      password: "123456",
    });

    const { token } = loginResonse.body;

    const response = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      total: expect.any(Number),
      products: expect.any(Array),
    });
  });

  it("User should be able do fetch product by id", async () => {
    const loginResonse = await request(app).post("/users/session").send({
      email: "user@test.com",
      password: "123456",
    });

    const { token } = loginResonse.body;

    const responseFetchAll = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${token}`);

    const product = responseFetchAll.body.products[0];

    const response = await request(app)
      .get(`/products/${product.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      product: expect.any(Object),
    });
  });

  it("User should not be able to create a product", async () => {
    const loginResonse = await request(app).post("/users/session").send({
      email: "user@test.com",
      password: "123456",
    });

    const { token } = loginResonse.body;

    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "product 01",
        price: 30.2,
        quantity: 22,
        description: "fake product",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({
      status: "error",
      message: expect.any(String),
    });
  });

  it("Admin should able to create a product", async () => {
    const loginResonse = await request(app).post("/users/session").send({
      email: "admin@test.com",
      password: "123456",
    });

    const { token } = loginResonse.body;

    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "product 01",
        price: 30.2,
        quantity: 22,
        description: "fake product",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      product: expect.any(Object),
    });
  });

  it("Admin should able to update a product", async () => {
    const loginResonse = await request(app).post("/users/session").send({
      email: "admin@test.com",
      password: "123456",
    });

    const { token } = loginResonse.body;
    const responseCreateProduct = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "product 01",
        price: 30.2,
        quantity: 22,
        description: "fake product",
      });

    const product = responseCreateProduct.body.product;

    const response = await request(app)
      .put(`/products/${product.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "product 02",
        price: 33.2,
        quantity: 20,
        description: "fake product 02",
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      product: {
        id: product.id,
        name: "product 02",
        price: 33.2,
        quantity: 20,
        description: "fake product 02",
      },
    });
  });

  it("Admin should able to delete a product", async () => {
    const loginResonse = await request(app).post("/users/session").send({
      email: "admin@test.com",
      password: "123456",
    });

    const { token } = loginResonse.body;
    const responseCreateProduct = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "product 01",
        price: 30.2,
        quantity: 22,
        description: "fake product",
      });

    const product = responseCreateProduct.body.product;

    const response = await request(app)
      .delete(`/products/${product.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(204);
  });
});
