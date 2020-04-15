require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "pg",
    connection: process.env.TEST_DB_URL,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    useNullAsDefault: true,
  },
};
