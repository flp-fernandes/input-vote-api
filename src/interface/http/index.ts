import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { Container } from "../../types/core";
import { IHttpInterface, IHttpRoute } from "../../types/interface";
import { TVShowController } from './controller/tvshow';
import { errorHandler } from './middleware/errorHandler';

type Config = {
  env: typeof import('../../util/env').env;
  coreContainer: Container
}

export class HttpInterface implements IHttpInterface {
  private app?: express.Application;
  private coreContainer: Config['coreContainer'];
  private env: Config['env']

  constructor(config: Config) {
    this.coreContainer = config.coreContainer;
    this.env = config.env;
  }

  initApp() {
    this.app = express();

    this.app.use(
      helmet(),
      cors(),
      compression(),
      express.json({
        limit: this.env.httpBodyLimit,
      })
    );

    this.setupRoutes();
    this.setupNotFound();

    this.app.use(errorHandler);
  }

  setupRoutes() {
    [
      new TVShowController({ coreContainer: this.coreContainer })
    ].forEach((route: IHttpRoute) => {
      const router = express.Router({ mergeParams: true });
      route.register(router);
      this.app?.use(router);
    })
  }

  setupNotFound() {
    this.app?.use(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        next(new Error('Page not found'));
      }
    );
  }

  serve(): void {
    this.initApp();

    this.app?.listen(this.env.httpPort);
  }
}