import knex, { Knex } from 'knex';
import { ITVShowRepository } from './tvshow';

/* MySQL Adapter */
export type MysqlDatabase = Knex;

export type MysqlAdapterConfig = {
  dbConn: MysqlDatabase;
}

export interface IMysqlAdapter {
  db: Knex.QueryBuilder;
  tableName: string;
}

/* Infrastructure */
export type Container = {
  tvShowRepository: ITVShowRepository;
}