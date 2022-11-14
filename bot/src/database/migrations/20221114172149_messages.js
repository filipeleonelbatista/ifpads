/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('messages', function (table) {
    table.increments('id').primary();
    table.boolean('isSended').notNullable();
    table.string('name');
    table.string('command');
    table.string('channel');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('messages')
};
