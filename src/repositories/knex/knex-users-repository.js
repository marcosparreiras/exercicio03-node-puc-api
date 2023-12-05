const { randomUUID } = require("node:crypto");
const knex = require("../../libs/knex");

class KnexUsersRepository {
  async create({ name, email, password_hash }) {
    const [user] = await knex("users")
      .insert({
        id: randomUUID(),
        name,
        email,
        password: password_hash,
        role: "user",
      })
      .returning("*");

    return user;
  }

  async findById(id) {
    const user = await knex("users").select("*").where("id", id).first();
    if (!user) {
      return null;
    }
    return user;
  }

  async findByEmail(email) {
    const user = await knex("users").select("*").where("email", email).first();
    if (!user) {
      return null;
    }
    return user;
  }
}

module.exports = KnexUsersRepository;
