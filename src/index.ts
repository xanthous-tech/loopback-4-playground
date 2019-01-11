import {LoopbackPlaygroundApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import {RestServer} from '@loopback/rest';

export {LoopbackPlaygroundApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new LoopbackPlaygroundApplication(options);
  await app.bootTypeOrm();
  await app.boot();

  await app.start();

  const rest = await app.getServer<RestServer>(RestServer);
  console.log(`Server is running at ${rest.url}`);
  console.log(`Try ${rest.url}/ping`);

  return app;
}
