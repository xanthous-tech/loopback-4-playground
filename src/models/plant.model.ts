import {Entity, PrimaryGeneratedColumn, Column} from 'loopback-4-typeorm';
import {property, model} from '@loopback/repository';

@model()
@Entity() // Mark class as Entity for TypeORM.
export class Plant {
  @PrimaryGeneratedColumn() // Mark id as PrimaryColumn.
  @property({type: 'number', id: true})
  id: number;

  @Column({unique: true}) // Mark field as varchar column.
  @property({type: 'string', required: true})
  name: string;

  @Column() // Mark field as varchar column.
  @property({type: 'string', required: true})
  image: string;

  @Column() // Mark field as varchar column.
  @property({type: 'string', required: true})
  description: string;
}
