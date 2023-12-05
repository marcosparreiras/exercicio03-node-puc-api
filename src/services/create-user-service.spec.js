const InMemoryUsersRepository = require("../repositories/in-memory/in-memory-users-repository");
const CreateUserService = require("./create-user-service");
const { hash, compare } = require("bcryptjs");

let usersRepository;
let sut;

describe("CreateUserService", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserService(usersRepository);
  });

  it("Should be able to create a user", async () => {
    const user = await sut.execute({
      name: "user 01",
      email: "user@test.com",
      password: "123546",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to create a user with duplicate e-mail", async () => {
    const email = "user@test.com";
    await usersRepository.create({
      name: "user 01",
      hash_password: await hash("123456", 6),
      email,
    });

    await expect(() => {
      return sut.execute({ name: "user 02", password: "123456", email });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should not be able to create a user password less the 6 characters", async () => {
    await expect(() => {
      return sut.execute({
        name: "user 02",
        password: "12345",
        email: "user@test.com",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should hash the user password", async () => {
    const user = await sut.execute({
      name: "user 01",
      email: "user@test.com",
      password: "123456",
    });

    const validatePassword = await compare("123456", user.password);
    expect(validatePassword).toEqual(true);
  });
});
