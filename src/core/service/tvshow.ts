import { ServiceContext } from "../../types/core";
import { ITVShowService, TVShow } from "../../types/tvshow";

export class TVShowService implements ITVShowService {
  private tvShowRepository: ServiceContext['tvShowRepository'];

  constructor(context: ServiceContext) {
    this.tvShowRepository = context.tvShowRepository;
  }
  
  addTVShow (tvShow: Omit<TVShow, "id" | "createdAt">): Promise<TVShow> {
    return this.tvShowRepository.saveTVShow(tvShow);
  }
}