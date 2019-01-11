import {LoopbackPlaygroundApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {LoopbackPlaygroundApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new LoopbackPlaygroundApplication(options);
  await app.bootTypeOrm();
  await app.boot();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  await app.start();

  return app;
}
