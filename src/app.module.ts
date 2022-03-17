import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {AuthModule} from "./auth/auth.module";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: "./.env"}),
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
