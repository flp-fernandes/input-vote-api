import R from 'ramda';

import { IMysqlAdapter } from '../../types/infrastructure';
import { ITVShowRepository, TVShow } from '../../types/tvshow';
import { binaryToString, stringToBinary } from '../../util/stringHandler';
import { FailedToSaveTVShow } from '../../util/error';
import { Logger } from '../../util/logger';

export type TVShowRepositoryContext = {
  mysqlAdapter: IMysqlAdapter;
}

export class TVShowRepository implements ITVShowRepository {
  private mysqlAdapter: IMysqlAdapter;
  private readonly logger = new Logger(TVShowRepository.name)

  constructor({ mysqlAdapter }: TVShowRepositoryContext) {
    this.mysqlAdapter = mysqlAdapter;
    this.mysqlAdapter.tableName = 'tvshows'
  }

  private toDatabase = R.evolve({
    tvShowUuid: R.unless(R.isNil, stringToBinary)
  }) as (_: Partial<TVShow> | null) => any;

  private fromDatabase = R.evolve({
    tvshowUuid: R.unless(R.isNil, binaryToString)
  })

  async saveTVShow (params: Omit<TVShow, 'id' | 'createdAt' | 'updatedAt'>): Promise<TVShow> {
    try {
      return await this.mysqlAdapter.db.insert(this.toDatabase({
        tvShowUuid: params.tvShowUuid,
        name: params.name,
        status: params.status,
      }))
    } catch (error) {
      this.logger.console().error('Failed to save TV Show: ', error);

      throw new FailedToSaveTVShow('Failed to save TV Show');
    }
  }
}