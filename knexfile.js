const path = require("path");

/**
 * @type { import("knex").Knex.Config }
 */
module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(
      __dirname,
      process.env.NODE_ENV === "test" ? "./db/test.db" : "./db/database.db"
    ),
  },
  migrations: {
    directory: path.resolve(__dirname, "./db/migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "./db/seeds"),
  },
  useNullAsDefault: true,
};
