import {get, requestBody, post} from '@loopback/rest';
import {repository} from 'loopback4-typeorm';

import {Plant} from '../models';
import {PlantRepository} from '../repositories';

export class PlantController {
  constructor(@repository(Plant) private plantRepository: PlantRepository) {}

  @get('/plants', {
    operationId: 'getPlants',
    description: '{getPlants} -- list all plants',
    responses: {
      '200': {
        description: 'Array of plants in plant database',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Plant}},
          },
        },
      },
    },
  })
  async find(): Promise<Plant[]> {
    return this.plantRepository.find();
  }

  @post('/plants', {
    operationId: 'getPlants',
    description: '{getPlants} -- list all plants',
    responses: {
      '200': {
        description: 'Array of plants in plant database',
        content: {
          'application/json': {
            schema: {'x-ts-type': Plant},
          },
        },
      },
    },
  })
  async create(@requestBody() plant: Plant): Promise<Plant> {
    const plantEntity = this.plantRepository.create(plant);
    return this.plantRepository.save(plantEntity);
  }
}
