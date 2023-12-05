const { randomUUID } = require("node:crypto");
const { hash } = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: randomUUID(),
      name: "fake user",
      email: "user@test.com",
      password: await hash("123456", 6),
      role: "user",
    },
    {
      id: randomUUID(),
      name: "admin",
      email: "admin@test.com",
      password: await hash("123456", 6),
      role: "admin",
    },
  ]);
};
