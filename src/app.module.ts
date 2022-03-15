import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: "./.env"}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    AuthModule
  ],
  controllers: [],
  providers: [AppService]
})
export class AppModule {}
