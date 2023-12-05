const { randomUUID } = require("node:crypto");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("products").del();
  await knex("products").insert([
    {
      id: randomUUID(),
      name: "Laptop",
      description: "Powerful laptop for gaming and productivity",
      price: 1500.99,
      quantity: 5,
    },
    {
      id: randomUUID(),
      name: "Smartphone",
      description: "High-end smartphone with a stunning camera",
      price: 899.99,
      quantity: 10,
    },
    {
      id: randomUUID(),
      name: "Headphones",
      description: "Wireless over-ear headphones with noise cancellation",
      price: 129.95,
      quantity: 8,
    },
    {
      id: randomUUID(),
      name: "Coffee Maker",
      description: "Automatic coffee maker for a perfect brew",
      price: 69.99,
      quantity: 3,
    },
    {
      id: randomUUID(),
      name: "Backpack",
      description: "Durable backpack with multiple compartments",
      price: 49.99,
      quantity: 15,
    },
    {
      id: randomUUID(),
      name: "Fitness Tracker",
      description: "Waterproof fitness tracker with heart rate monitor",
      price: 79.99,
      quantity: 7,
    },
    {
      id: randomUUID(),
      name: "Desk Chair",
      description: "Ergonomic desk chair for comfort during work",
      price: 149.99,
      quantity: 4,
    },
    {
      id: randomUUID(),
      name: "Television",
      description: "Smart TV with 4K resolution and built-in streaming apps",
      price: 699.99,
      quantity: 2,
    },
    {
      id: randomUUID(),
      name: "Wireless Mouse",
      description: "Wireless mouse for smooth and precise navigation",
      price: 29.99,
      quantity: 12,
    },
    {
      id: randomUUID(),
      name: "Gaming Console",
      description: "Latest gaming console for immersive gaming experience",
      price: 399.99,
      quantity: 6,
    },
  ]);
};
