import {Roles} from 'loopback-4-accesscontrol';
import {ValueOrPromise, Provider} from '@loopback/context';

export class AccessRolesProvider implements Provider<Roles> {
  constructor() {}

  value(): ValueOrPromise<Roles> {
    return () => {
      /**
       * Here we should check for users permission.
       * In a real application we can calculate user roles
       * by querying the database.
       */
      return ['guest', 'admin'];
    };
  }
}
