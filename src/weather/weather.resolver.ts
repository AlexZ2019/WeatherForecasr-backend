import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
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
    private readonly weatherService: WeatherService,
  ) {}

  @Query(() => [CitiesModel])
  @UseGuards(AccessTokenGuard)
  async findCity(@Args() cityArgs: CityArgs) {
    return this.weatherService.findCity(cityArgs);
  }

  @Mutation(() => Boolean)
  @UseGuards(AccessTokenGuard)
  async addCity(@Args() cityInfo: AddCityArgs): Promise<boolean> {
    await this.weatherService.addCity(cityInfo);
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AccessTokenGuard)
  async deleteCity(@Args() deleteCityArgs: DeleteCityArgs) {
    await this.weatherService.deleteCity(
      deleteCityArgs.userId,
      deleteCityArgs.cityId,
    );
    return true
  }

  @Query(() => [CityIdModel])
  @UseGuards(AccessTokenGuard)
  async getCitiesIds(@Args() userIdArgs: UserId) {
    return this.weatherService.getCitiesIds(userIdArgs.userId);
  }

  @Query(() => WeatherModel)
  @UseGuards(AccessTokenGuard)
  async getWeather(@Args() cityIdArgs: CityIdArgs) {
    return this.weatherService.getWeather(cityIdArgs.cityId);
  }
}
