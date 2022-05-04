import { Column, Entity } from 'typeorm';
import { Injectable } from '@nestjs/common';
import BaseEntity from '../../common/entities/baseEntity';

@Entity()
@Injectable()
export default class City extends BaseEntity {
  @Column()
  name: string;

  @Column()
  lon: string;

  @Column()
  lat: string;

  @Column()
  country: string;

  @Column()
  state: string;
}
