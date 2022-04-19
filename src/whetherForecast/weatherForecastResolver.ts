import { Args, Query, Resolver } from '@nestjs/graphql';
import { CitiesModel } from './models/citiesModel';
import { WeatherForecastService } from './weatherForecastService';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CityArgs } from './dto/args';

@Resolver()
export class WeatherForecastResolver {

  constructor(private readonly weatherForecastService: WeatherForecastService) {
  }

  @Query(() => [CitiesModel])
  @UseGuards(GqlAuthGuard)
  async findCity(@Args() cityArgs: CityArgs) {
    return this.weatherForecastService.findCity(cityArgs);
  }

  @Query(() => [CitiesModel])
  @UseGuards(GqlAuthGuard)
  async getCityWeatherForecast(@Args() cityArgs: CityArgs) {
    const data = [
      {
        name: 'Vinnytsia',
        lat: 49.2320162,
        lon: 28.467975,
        country: 'UA',
        state: 'Vinnytsia Oblast'
      },
      {
        name: 'Vinnytsia',
        lat: 48.425616000000005,
        lon: 35.13497630605263,
        country: 'UA',
        state: 'Dnipropetrovsk Oblast'
      }
    ];

    return this.weatherForecastService.findCity(cityArgs);
  }
}
