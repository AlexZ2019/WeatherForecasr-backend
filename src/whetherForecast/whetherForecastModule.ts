import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherForecastService } from './weatherForecastService';
import { CityEntity } from './entities/city.entity';
import { WeatherForecastResolver } from './weatherForecastResolver';
import { WeatherForecastApi } from './api/weatherForecastApi';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), HttpModule],
  providers: [WeatherForecastResolver, WeatherForecastService, WeatherForecastApi],
  exports: [WeatherForecastService]
})

export class WhetherForecastModule {}
