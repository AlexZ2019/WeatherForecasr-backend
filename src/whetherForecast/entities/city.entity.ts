import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class CityEntity {
    @PrimaryColumn()
    id: number

    @Column()
    city: string

    // @Column()
    // whetherForecast: string
}
