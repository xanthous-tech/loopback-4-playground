import {ConnectionOptions} from 'loopback-4-typeorm';

/**
 * These will change depending on the database driver you want to
 * use.
 *
 * For more information please refer to the
 * [typeorm docs](http://typeorm.io/#/connection-options).
 */
export const ormconfig: ConnectionOptions = {
  name: 'default',
  type: 'sqlite',
  database: 'data/db.sqlite',
  entities: ['dist/src/models/*.model.js'],
  synchronize: true,
  logging: true,
};
