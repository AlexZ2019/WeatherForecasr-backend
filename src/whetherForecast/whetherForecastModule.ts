import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import City from './entities/city';
import WeatherForecastService from './weatherForecastService';
import UserCity from './entities/userСity';
import WeatherForecastResolver from './weatherForecastResolver';
import WeatherForecastApi from './api/weatherForecastApi';

@Module({
  imports: [TypeOrmModule.forFeature([City, UserCity]), HttpModule],
  providers: [
    WeatherForecastResolver,
    WeatherForecastService,
    WeatherForecastApi,
  ],
  exports: [WeatherForecastService],
})
export default class WhetherForecastModule {}
