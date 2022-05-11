import { Column, Entity } from 'typeorm';
import BaseEntity from '../../common/entities/baseEntity';

@Entity()
export class Token extends BaseEntity {
  @Column()
  userId: number

  @Column()
  accessToken: string

  @Column()
  refreshToken: string
}
