import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/baseEntity';
import { Injectable } from '@nestjs/common';

@Entity()
@Injectable()
export class City extends BaseEntity {

    @Column()
    name: string

    @Column()
    lon: string

    @Column()
    lat: string

    @Column()
    country: string

    @Column()
    state: string
}
