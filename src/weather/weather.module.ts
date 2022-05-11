import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import City from './entities/city.entity';
import WeatherService from './weather.service';
import UserCity from './entities/userСity.entity';
import WeatherResolver from './weather.resolver';
import WeatherApi from './api/weather.api';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([City, UserCity]), HttpModule.registerAsync({
    imports:[ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      baseURL:  'http://api.openweathermap.org/',
      params: {
        appid: configService.get('WEATHER_API_KEY')
      }
    }),
    inject: [ConfigService]
  })],
  providers: [
    WeatherResolver,
    WeatherService,
    WeatherApi,
  ],
  exports: [WeatherService],
})
export default class WeatherModule {}
