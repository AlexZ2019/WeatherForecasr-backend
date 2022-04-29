import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CitiesModel } from './models/cities.model';
import { WeatherForecastService } from './weatherForecastService';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CityArgs } from './dto/city';
import { AddCityArgs } from './dto/addCity';
import { SuccessModel } from '../common/models/successModel';
import { UserId } from '../common/dto/userId';
import { WeatherForecastModel } from './models/weatherForecast.model';
import { CityIdModel } from './models/cityId.model';
import { CityIdArgs } from './dto/cityId';
import { DeleteCityArgs } from './dto/deleteCity';

@Resolver()
export class WeatherForecastResolver {

  constructor(private readonly weatherForecastService: WeatherForecastService) {}

  @Query(() => [CitiesModel])
  @UseGuards(GqlAuthGuard)
  async findCity(@Args() cityArgs: CityArgs) {
    return this.weatherForecastService.findCity(cityArgs);
  }

  @Mutation(() => SuccessModel)
  @UseGuards(GqlAuthGuard)
  async addCity(@Args() cityInfo: AddCityArgs) {
    return this.weatherForecastService.addCity(cityInfo);
  }

  @Mutation(() => SuccessModel)
  @UseGuards(GqlAuthGuard)
  async deleteCity(@Args() deleteCityArgs: DeleteCityArgs) {
    return this.weatherForecastService.deleteCity(deleteCityArgs.userId, deleteCityArgs.cityId);
  }

  @Query(() => [CityIdModel])
  @UseGuards(GqlAuthGuard)
  async getUserCitiesId(@Args() userIdArgs: UserId) {
    return this.weatherForecastService.getUserCitiesId(userIdArgs.userId);
  }

  @Query(() => WeatherForecastModel)
  @UseGuards(GqlAuthGuard)
  async getCityWeatherForecast(@Args() cityIdArgs: CityIdArgs) {
    return this.weatherForecastService.getWeatherForecast(cityIdArgs.cityId);
  }
}
