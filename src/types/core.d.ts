import { ITVShowService, ITVShowUseCase } from "./tvshow"

export type Container = {
  tvShowUseCase: ITVShowUseCase;
}

export type UseCaseContext = {
  tvShowService: ITVShowService;
}