const path = require('path')

const db = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, './prod.sqlite3')
  },
  useNullAsDefault: false,
});

module.exports = db;