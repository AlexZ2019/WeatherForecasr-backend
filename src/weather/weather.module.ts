import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import City from './entities/city.entity';
import WeatherService from './weather.service';
import UserCity from './entities/userСity.entity';
import WeatherResolver from './weather.resolver';
import WeatherApi from './api/weather.api';

@Module({
  imports: [TypeOrmModule.forFeature([City, UserCity]), HttpModule.register({
    baseURL: 'http://api.openweathermap.org/',
    params: {
      appid: 'e90c7d39dc20f82c07095175419f9379'
    }
  })],
  providers: [
    WeatherResolver,
    WeatherService,
    WeatherApi,
  ],
  exports: [WeatherService],
})
export default class WeatherModule {}
