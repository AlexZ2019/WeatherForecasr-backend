import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import AuthModule from './auth/auth.module';
import UsersDbModule from './db/users/users.db.module';
import UserModule from './user/user.module';
import WeatherModule from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    UsersDbModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    AuthModule,
    UserModule,
    WeatherModule,
  ],
})
export default class AppModule {}
