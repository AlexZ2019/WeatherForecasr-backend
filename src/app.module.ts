import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {config} from "rxjs";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: "./.env"}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"aurora-data-api">("TYPEORM_CONNECTION"),
        username: config.get<string>("TYPEORM_USERNAME"),
        password: config.get<string>("TYPEORM_PASSWORD"),
        database: config.get<string>("TYPEORM_DATABASE"),
        port: config.get<number>("TYPEORM_PORT"),
        entities: [__dirname + "dist/**/*.entity{.ts,.js}"],
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
