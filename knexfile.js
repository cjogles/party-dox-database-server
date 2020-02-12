module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: './database/<database-filename>.db',
    },
    migrations: {
      directory: './database/migrations',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
  },

  testing: {
    client: 'pg',
    connection: {
      filename: './database/test.db',
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
  }

};