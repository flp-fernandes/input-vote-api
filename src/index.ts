import { createContainer } from "./interface/interfaceContainer";
import { env } from './util/env';
import { Logger } from "./util/logger";

type AppConfig = {
  http?: boolean
}

export class App {
  private _http?: boolean;
  private readonly logger = new Logger(App.name)
  
  constructor({ http }: AppConfig) {
    this._http = http;
  }

  run() {
    const interfaceContainer = createContainer({
      env,
      init: {
        http: this._http
      }
    })

    if (this._http) {
      interfaceContainer.httpInterface?.serve();
    }

    this.logger.console().info('app initialized')
  }
}

const app = new App({
  http: env.httpActive
})

setImmediate(() => {
  app.run();
})