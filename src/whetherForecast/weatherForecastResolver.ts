import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CitiesModel } from './models/citiesModel';
import { WeatherForecastService } from './weatherForecastService';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CityArgs } from './dto/city';
import { AddCityArgs } from './dto/addCity';
import { AddCityModel } from './models/addCity.model';

@Resolver()
export class WeatherForecastResolver {

  constructor(private readonly weatherForecastService: WeatherForecastService) {
  }

  @Query(() => [CitiesModel])
  @UseGuards(GqlAuthGuard)
  async findCity(@Args() cityArgs: CityArgs) {
    return this.weatherForecastService.findCity(cityArgs);
  }

  @Mutation(() => AddCityModel)
  @UseGuards(GqlAuthGuard)
  async addCity(@Args() cityInfo: AddCityArgs) {
    return this.weatherForecastService.addCity(cityInfo);
  }

  @Query(() => [CitiesModel])
  @UseGuards(GqlAuthGuard)
  async getCityWeatherForecast(@Args() cityArgs: CityArgs) {
    return this.weatherForecastService.findCity(cityArgs);
  }
}
