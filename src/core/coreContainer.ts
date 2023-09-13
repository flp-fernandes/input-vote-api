import { Container, ContainerConfig } from "../types/core";
import { TVShowService } from "./service/tvshow";
import { TVShowUseCase } from "./useCase/tvshow";

export function createCoreContainer(config: ContainerConfig): Container {
  const serviceContext = {
    tvShowRepository: config.tvShowRepository,
  }
  
  const useCaseContext = {
    tvShowService: new TVShowService(serviceContext),
  }

  return {
    tvShowUseCase: new TVShowUseCase(useCaseContext)
  }
}