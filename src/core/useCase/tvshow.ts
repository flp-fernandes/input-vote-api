import crypto from 'crypto';

import { ITVShowUseCase, TVShow } from '../../types/tvshow';
import { validateProperties } from './schemas/shared';
import { addTVShowSchema } from './schemas/tvshow';

export class TVShowUseCase implements ITVShowUseCase {
  public async addTVShow(params: TVShow): Promise<Partial<TVShow>> {
    validateProperties({
      schema: addTVShowSchema,
      params,
      errorMsg: 'Invalid properties to add a TV Show'
    })
    
    const tvShowUuid = crypto.randomUUID();

    return {
      tvShowUuid,
      name: params.name,
      status: params.status,
      createdAt: new Date(),
    }
  }
}