import knex, { Knex } from "knex";
import { TVShowStatus } from "../src/types/tvshow";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tvshows', (t) => {
    t.increments('id').primary().nullable().unique();
    t.binary('tvShowUuid', 16).notNullable().unique();
    t.string('name', 255).notNullable().unique();
    t.enum('status', Object.values(TVShowStatus));
    t.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    t.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tvshow');
}

