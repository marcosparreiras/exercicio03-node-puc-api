const { execSync } = require("node:child_process");
const app = require("../src/app");
const request = require("supertest");
const kenx = require("../src/libs/knex");

describe("Users routes", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = "default";
  });

  beforeEach(() => {
    execSync("npx knex migrate:rollback --all");
    execSync("npx knex migrate:latest");
  });

  afterAll((done) => {
    const server = app.listen(3000, () => {
      kenx.destroy();
      server.close(done);
    });
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "user 01",
      email: "user@test.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      user: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        role: expect.any(String),
      }),
    });
  });

  it("Shoud be able to login with an existing user", async () => {
    await request(app).post("/users").send({
      name: "user 01",
      email: "user@test.com",
      password: "123456",
    });

    const response = await request(app).post("/users/session").send({
      email: "user@test.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
      user: expect.any(Object),
    });
  });
});
