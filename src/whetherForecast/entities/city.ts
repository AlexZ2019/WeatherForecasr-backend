import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    lon: number

    @Column()
    lat: number

    @Column()
    country: string

    @Column()
    state: string
}
