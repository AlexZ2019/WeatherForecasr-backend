import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/baseEntity';

@Entity()
export class City extends BaseEntity {

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
