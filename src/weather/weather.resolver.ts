import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import GqlAuthGuard from '../auth/guards/gql-auth.guard';
import SuccessModel from '../common/models/successModel';
import UserId from '../common/dto/userId';
import WeatherService from './weather.service';
import DeleteCityArgs from './dto/deleteCity.dto';
import CityIdModel from './models/cityId.model';
import WeatherModel from './models/weather.model';
import CitiesModel from './models/cities.model';
import CityArgs from './dto/city.dto';
import CityIdArgs from './dto/cityId.dto';
import AddCityArgs from './dto/addCity.dto';

@Resolver()
export default class WeatherResolver {
  constructor(
    private readonly weatherForecastService: WeatherService,
  ) {}

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
    return this.weatherForecastService.deleteCity(
      deleteCityArgs.userId,
      deleteCityArgs.cityId,
    );
  }

  @Query(() => [CityIdModel])
  @UseGuards(GqlAuthGuard)
  async getUserCitiesId(@Args() userIdArgs: UserId) {
    return this.weatherForecastService.getUserCitiesId(userIdArgs.userId);
  }

  @Query(() => WeatherModel)
  @UseGuards(GqlAuthGuard)
  async getCityWeatherForecast(@Args() cityIdArgs: CityIdArgs) {
    return this.weatherForecastService.getWeatherForecast(cityIdArgs.cityId);
  }
}
