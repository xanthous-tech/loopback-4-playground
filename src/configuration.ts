import {ConnectionOptions} from 'loopback-4-typeorm';

export const ormconfig: ConnectionOptions = {
  name: 'default',
  type: 'sqlite',
  database: 'data/db.sqlite',
  entities: ['dist/src/models/*.model.js'],
  synchronize: true,
  logging: true,
};
