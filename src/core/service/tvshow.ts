import { ITVShowService, TVShow } from "../../types/tvshow";

export class TVShowService implements ITVShowService {
  async addTVShow (params: Omit<TVShow, "id" | "createdAt">): Promise<TVShow> {
    const createdAt = new Date();
    
    return {
      ...params,
      createdAt
    }
  }
}