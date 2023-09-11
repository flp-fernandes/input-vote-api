export enum TVShowStatus {
  ON_THE_AIR = 'ON_THE_AIR',
  OFF_THE_AIR = 'OFF_THE_AIR'
}

export type TVShow = {
  id?: string;
  tvShowUuid?: string;
  name: string;
  status: TVShowStatus;
  createdAt?: Date;
}

export interface ITVShowUseCase {
  addTVShow(params: Omit<TVShow, 'id' | 'tvShowUuid' | 'createdAt'>): Promise<Partial<TVShow>>;
}

export interface ITVShowService {
  addTVShow(params: Omit<TVShow, 'id' | 'createdAt'>): Promise<TVShow>;
}