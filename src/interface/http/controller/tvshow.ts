import httpStatus from 'http-status-codes';

import { HttpControllerConfig, HttpNext, HttpRequest, HttpResponse, HttpRouter, IHttpRoute } from "../../../types/interface";
import { addTVShowSchema } from '../schema/tvshow';

export class TVShowController implements IHttpRoute {
  private _validator: HttpControllerConfig['validator']
  private tvShowUseCase: HttpControllerConfig['coreContainer']['tvShowUseCase'];

  constructor({ coreContainer, validator }: HttpControllerConfig) {
    this._validator = validator;
    this.tvShowUseCase = coreContainer.tvShowUseCase;
  }

  register (router: HttpRouter): void {
    router
      .route('/v1/tvshow')
      .post(
        this._validator(addTVShowSchema),
        this.addTVShow.bind(this)
      )
  }

  async addTVShow(req: HttpRequest, res: HttpResponse, next: HttpNext) {
    try {
      const {
        name,
        status,
      } = req.body;

      const tvShow = {
        name,
        status,
      }

      const result = await this.tvShowUseCase.addTVShow(tvShow);

      res.status(httpStatus.CREATED).send({
        tvShowUuid: result.tvShowUuid,
        name: result.name,
        status: result.status,
        createdAt: result.createdAt
      })
    } catch (error) {
      next(error);
    }
  }
}