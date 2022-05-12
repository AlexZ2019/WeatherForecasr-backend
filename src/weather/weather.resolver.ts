import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
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
  async findCity(@Args() cityArgs: CityArgs, @Context() context) {
    return this.weatherService.findCity(cityArgs, context.req.user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(AccessTokenGuard)
  async addCity(@Args() cityInfo: AddCityArgs, @Context() context): Promise<boolean> {
    await this.weatherService.addCity(cityInfo, context.req.user.id);
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AccessTokenGuard)
  async deleteCity(@Args() deleteCityArgs: DeleteCityArgs, @Context() context) {
    await this.weatherService.deleteCity(
      context.req.user.id,
      deleteCityArgs.cityId
    );
    return true
  }

  @Query(() => [CityIdModel])
  @UseGuards(AccessTokenGuard)
  async getCitiesIds(@Context() context) {
    return this.weatherService.getCitiesIds(context.req.user.id);
  }

  @Query(() => WeatherModel)
  @UseGuards(AccessTokenGuard)
  async getWeather(@Args() cityIdArgs: CityIdArgs) {
    return this.weatherService.getWeather(cityIdArgs.cityId);
  }
}
