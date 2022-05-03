import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;
}
