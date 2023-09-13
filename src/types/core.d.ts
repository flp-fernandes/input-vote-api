import { ITVShowService, ITVShowUseCase } from "./tvshow"
import { Container as infraContainer } from './infrastructure';

export type Container = {
  tvShowUseCase: ITVShowUseCase;
}

export type ContainerConfig = {
  tvShowRepository: infraContainer['tvShowRepository']
}

export type ServiceContext = {
  tvShowRepository: ContainerConfig['tvShowRepository'];
}

export type UseCaseContext = {
  tvShowService: ITVShowService;
}