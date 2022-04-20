import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/baseEntity';

@Entity()
export class UserCity extends BaseEntity{
  @Column()
  userid: number

  @Column()
  cityId: number
}
