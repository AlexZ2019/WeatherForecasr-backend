import { Column, Entity } from 'typeorm';
import BaseEntity from '../../common/entities/baseEntity';

@Entity()
export default class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;
}
