const { randomUUID } = require("node:crypto");

class InMemoryProductsRepository {
  #items = [];

  async findAll(search) {
    if (!search) {
      return this.#items;
    }
    const products = this.#items.filter(
      (item) => item.name.includes(search) || item.description.includes(search)
    );

    return products;
  }

  async findById(id) {
    const product = this.#items.find((item) => item.id === id);
    if (!product) {
      return null;
    }
    return product;
  }

  async findByName(name) {
    const product = this.#items.find((item) => item.name === name);
    if (!product) {
      return null;
    }
    return product;
  }

  async create({ name, description, price, quantity }) {
    const product = {
      id: randomUUID(),
      name,
      description,
      price,
      quantity,
    };
    this.#items.push(product);
    return product;
  }

  async update({ id, name, description, price, quantity }) {
    const productIndex = this.#items.findIndex((item) => item.id == id);
    if (productIndex < 0) {
      return null;
    }

    const product = {
      id,
      name,
      description,
      price,
      quantity,
    };

    this.#items[productIndex] = product;
    return product;
  }

  async delete(id) {
    this.#items.filter((item) => item.id !== id);
    return true;
  }
}

module.exports = InMemoryProductsRepository;
