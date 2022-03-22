import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID} from "@nestjs/graphql";

@Entity("users")
export class UsersEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    email: string

    @Field()
    @Column({ type: "varchar" })
    password: string

    // async validatePassword(password: string): Promise<boolean> {
        // const hash = await bcrypt.hash(password, this.salt)
        // return hash === this.password
    // }
}
