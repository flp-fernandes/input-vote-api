import { ContainerConfig } from "../types/core";
import { Container } from "../types/infrastructure";
import { MysqlAdapter } from "./adapter/mysql";
import { TVShowRepository } from "./repository/tvshow";

export function createInfraContainer(): Container {
  return {
    tvShowRepository: new TVShowRepository({
      mysqlAdapter: new MysqlAdapter()
    })
  }
}