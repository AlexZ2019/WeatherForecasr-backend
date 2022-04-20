import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherForecastService } from './weatherForecastService';
import { City } from './entities/city';
import { WeatherForecastResolver } from './weatherForecastResolver';
import { WeatherForecastApi } from './api/weatherForecastApi';
import { HttpModule } from '@nestjs/axios';
import { UserCity } from './entities/userСity';


@Module({
  imports: [TypeOrmModule.forFeature([City, UserCity]), HttpModule],
  providers: [WeatherForecastResolver, WeatherForecastService, WeatherForecastApi],
  exports: [WeatherForecastService]
})

export class WhetherForecastModule {}
