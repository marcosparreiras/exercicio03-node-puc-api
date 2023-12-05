const knexInit = require("knex");
const knexConfig = require("../../knexfile");

const knex = knexInit(knexConfig);

module.exports = knex;
