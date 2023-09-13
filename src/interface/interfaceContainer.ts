import { createCoreContainer } from "../core/coreContainer";
import { createInfraContainer } from "../infrastructure/infrastructureContainer";
import { IHttpInterface } from "../types/interface"
import { HttpInterface } from "./http";


type ContainerConfig = {
  env: typeof import('../util/env').env,
  init: {
    http?: boolean;
  }
}

type Container = {
  httpInterface?: IHttpInterface;
}

export function createContainer(config: ContainerConfig): Container {
  const container: Container = {};

  const infraContainer = createInfraContainer();

  const coreContainer = createCoreContainer(infraContainer);

  if (config.init.http) {
    container.httpInterface = new HttpInterface({
      env: config.env,
      coreContainer,
    });
  }

  return container
}

