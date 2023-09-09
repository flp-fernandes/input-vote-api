import { createContainer } from "./interface/interfaceContainer";
import { env } from './util/env';

type AppConfig = {
  http?: boolean
}

export class App {
  private _http?: boolean;
  
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
  }
}

const app = new App({
  http: env.httpActive
})

setImmediate(() => {
  app.run();
  console.log('app initialized');
})