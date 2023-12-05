const InMemoryUsersRepository = require("../repositories/in-memory/in-memory-users-repository");
const AuthenticateUserService = require("./authenticate-user-service");
const { hash } = require("bcryptjs");

let usersRepository;
let sut;

describe("AuthenticateUserService", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserService(usersRepository);
  });

  it("Should be able to authenticate a user", async () => {
    const email = "user@test.com";
    const password = "123456";
    await usersRepository.create({
      name: "user 01",
      email,
      password_hash: await hash(password, 6),
    });

    const user = await sut.execute({ email, password });
    expect(user.id).toEqual(expect.any(String));
  });

  it("Should invalidate a user with incorrect e-mail", async () => {
    const password = "123456";
    await usersRepository.create({
      name: "user 01",
      email: "user@test.com",
      password_hash: await hash(password, 6),
    });

    await expect(() => {
      return sut.execute({ email: "test@test.com", password });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should invalidate a user with incorrect password", async () => {
    const email = "user@test.com";
    await usersRepository.create({
      name: "user 01",
      email,
      password_hash: await hash("123456", 6),
    });

    await expect(() => {
      return sut.execute({ email, password: "654321" });
    }).rejects.toBeInstanceOf(Error);
  });
});
