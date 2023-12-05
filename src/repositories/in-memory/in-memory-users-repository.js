const { randomUUID } = require("node:crypto");

class InMemoryUsersRepository {
  #items = [];

  async create({ name, email, password_hash }) {
    const user = {
      id: randomUUID(),
      name,
      email,
      password: password_hash,
      role: "user",
    };
    this.#items.push(user);
    return user;
  }

  async findById(id) {
    const user = this.#items.find((item) => item.id === id);
    if (!user) {
      return null;
    }
    return user;
  }

  async findByEmail(email) {
    const user = this.#items.find((item) => item.email === email);
    if (!user) {
      return null;
    }
    return user;
  }
}

module.exports = InMemoryUsersRepository;
