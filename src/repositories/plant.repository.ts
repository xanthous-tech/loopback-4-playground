import {EntityRepository, Repository} from 'loopback4-typeorm';
import {Plant} from '../models';

/**
 * Repositories are binded to the application context by TypeORM booter mixin
 * when application starts.
 *
 * This class implemantation is required only if you need to have custom methods
 * on your repository. If a repository for the model not defined, booter will
 * bind default repository of that model to the application context.
 */
@EntityRepository(Plant)
export class PlantRepository extends Repository<Plant> {
  /**
   * Custom methods go here.
   */
}
