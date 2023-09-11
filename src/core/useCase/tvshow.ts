import crypto from 'crypto';

import { ITVShowUseCase, TVShow } from '../../types/tvshow';
import { validateProperties } from './schemas/shared';
import { addTVShowSchema } from './schemas/tvshow';
import { UseCaseContext } from '../../types/core';

export class TVShowUseCase implements ITVShowUseCase {
  private tvShowService: UseCaseContext['tvShowService']

  constructor(ctx: UseCaseContext) {
    this.tvShowService = ctx.tvShowService;
  }

  public async addTVShow(params: TVShow): Promise<Partial<TVShow>> {
    validateProperties({
      schema: addTVShowSchema,
      params,
      errorMsg: 'Invalid properties to add a TV Show'
    })
    
    const tvShowUuid = crypto.randomUUID();

    const tvShow = await this.tvShowService.addTVShow({ ...params, tvShowUuid })

    return {
      ...tvShow
    }
  }
}