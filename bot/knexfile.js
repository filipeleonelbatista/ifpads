// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './src/database/prod.sqlite3'
  },
  useNullAsDefault: false,
  migrations: {
    directory: "./src/database/migrations"
  }
};
