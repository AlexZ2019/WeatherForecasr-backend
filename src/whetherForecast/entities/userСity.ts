import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserCity {
  @PrimaryColumn()
  userid: number

  @Column()
  cityId: number
}
