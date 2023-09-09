import { Container } from "../types/core";
import { TVShowUseCase } from "./useCase/tvshow";

export function createCoreContainer(): Container {
  return {
    tvShowUseCase: new TVShowUseCase()
  }
}