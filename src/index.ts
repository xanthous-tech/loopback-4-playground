import {RestServer} from '@loopback/rest';
import {ApplicationConfig} from '@loopback/core';
import {AccessBindings, AccessComponent} from 'loopback-4-accesscontrol';

import {LoopbackPlaygroundApplication} from './application';
import {AccessRolesProvider} from './providers';
import {accesscontrol} from './configuration';

const options = {
  accesscontrol,
};

export {LoopbackPlaygroundApplication};
export async function main(_options: ApplicationConfig = {}) {
  /**
   * Here we can pass application options into loopback.
   */
  _options = Object.assign({}, _options, options);
  const app = new LoopbackPlaygroundApplication(_options);

  /**
   * Boot typeorm first. This will create a connection and bind
   * repositories into app context.
   */
  await app.bootTypeOrm();
  await app.boot();

  app.component(AccessComponent);
  app.bind(AccessBindings.ROLES).toProvider(AccessRolesProvider);

  await app.start();

  const rest = await app.getServer<RestServer>(RestServer);
  console.log(`Server is running at ${rest.url}`);
  console.log(`Try ${rest.url}/ping`);

  return app;
}
