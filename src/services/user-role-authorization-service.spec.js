const { hash } = require("bcryptjs");
const InMemoryUsersRepository = require("../repositories/in-memory/in-memory-users-repository");
const UserRoleAuthorizationService = require("./user-role-authorization-service");

let usersRepository;
let sut;

describe("UserRoleAuthorizationService", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UserRoleAuthorizationService(usersRepository);
  });

  it("Should be able to verify user role", async () => {
    const user = await usersRepository.create({
      name: "user 01",
      email: "user@test.com",
      hash_password: await hash("123456", 6),
    });

    const verification = await sut.execute({ userId: user.id, role: "user" });

    expect(verification).toEqual(true);
  });

  it("Should be unauthorize roles with no permission", async () => {
    const user = await usersRepository.create({
      name: "user 01",
      email: "user@test.com",
      hash_password: await hash("123456", 6),
    });

    await expect(() => {
      return sut.execute({ userId: user.id, role: "admin" });
    }).rejects.toBeInstanceOf(Error);
  });
});
