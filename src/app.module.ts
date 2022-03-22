import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: "./.env"}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<string>("TYPEORM_CONNECTION"),
        host: config.get<string>("TYPEORM_HOST"),
        username: config.get<string>("TYPEORM_USERNAME"),
        password: config.get<string>("TYPEORM_PASSWORD"),
        database: config.get<string>("TYPEORM_DATABASE"),
        port: config.get<number>("TYPEORM_PORT"),
        entities: [__dirname + "dist/**/*.entity{.ts,.js}"], // TODO: change pattern
        synchronize: true,
        autoloadEntities: true,
        logging: true
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res })
    }),
    AuthModule,
    UsersModule
  ]
})

export class AppModule {}
