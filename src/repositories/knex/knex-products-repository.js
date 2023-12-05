const { randomUUID } = require("node:crypto");
const knex = require("../../libs/knex");

class KnexProductsRepository {
  async findAll(search) {
    let products;

    if (!search) {
      products = await knex("products").select("*");
    } else {
      products = await knex("products")
        .select("*")
        .whereLike("name", `%${search}%`)
        .orWhereLike("description", `%${search}%`);
    }

    return products;
  }

  async findById(id) {
    const product = await knex("products").select("*").where("id", id).first();
    if (!product) {
      return null;
    }
    return product;
  }

  async findByName(name) {
    const product = await knex("products")
      .select("*")
      .where("name", name)
      .first();
    if (!product) {
      return null;
    }
    return product;
  }

  async create({ name, description, price, quantity }) {
    const [product] = await knex("products")
      .insert({
        id: randomUUID(),
        name,
        description,
        price,
        quantity,
      })
      .returning("*");
    return product;
  }

  async update({ id, name, description, price, quantity }) {
    const [product] = await knex("products")
      .where("id", id)
      .update({ name, description, price, quantity })
      .returning("*");
    return product;
  }

  async delete(id) {
    await knex("products").where("id", id).delete();
    return true;
  }
}

module.exports = KnexProductsRepository;
