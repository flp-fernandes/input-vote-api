import crypto from 'crypto';

import { ITVShowUseCase, TVShow } from '../../types/tvshow';

export class TVShowUseCase implements ITVShowUseCase {
  public async addTVShow(params: TVShow): Promise<Partial<TVShow>> {
    const tvShowUuid = crypto.randomUUID()

    return {
      tvShowUuid,
      name: params.name,
      status: params.status,
      createdAt: new Date(),
    }
  }
}