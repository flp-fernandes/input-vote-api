import { Container } from "../types/core";
import { TVShowService } from "./service/tvshow";
import { TVShowUseCase } from "./useCase/tvshow";

export function createCoreContainer(): Container {
  const useCaseContext = {
    tvShowService: new TVShowService(),
  }
  
  
  return {
    tvShowUseCase: new TVShowUseCase(useCaseContext)
  }
}