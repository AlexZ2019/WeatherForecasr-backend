import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from 'rxjs';
import City from './entities/city';
import UserCity from './entities/userСity';
import CityArgs from './dto/city';
import WeatherForecastApi from './api/weatherForecastApi';
import AddCityArgs from './dto/addCity';

@Injectable()
export default class WeatherForecastService {
  constructor(
    @InjectRepository(City) private readonly cityRepository: Repository<City>,
    @InjectRepository(UserCity)
    private readonly userCityRepository: Repository<UserCity>,
    private readonly weatherForecastApi: WeatherForecastApi,
  ) {}

  async findCity(cityArgs: CityArgs): Promise<any | undefined> {
    const res = await this.weatherForecastApi.findCity(cityArgs.city);
    return res.pipe(
      map((resp) =>
        resp.data.map((obj) => ({
          name: obj.name,
          country: obj.country,
          state: obj.state,
          lat: obj.lat,
          lon: obj.lon,
        })),
      ),
    );
  }

  async addCity(cityInfo: AddCityArgs) {
    const res = await this.cityRepository.findOneBy({
      lat: cityInfo.lat,
      lon: cityInfo.lon,
    });
    const userCities = await this.userCityRepository.findBy({
      userid: cityInfo.userId,
    });
    if (userCities.length === 10) {
      return new Error("You can't add more than 10 cards");
    }
    const isCityAdded = userCities.filter(
      (userCity) => userCity.cityId === res.id,
    );
    if (isCityAdded[0]) {
      return new Error('This city has already been added');
    }

    if (res) {
      try {
        await this.userCityRepository.save({
          cityId: res.id,
          userid: cityInfo.userId,
        });
      } catch (err) {
        return err;
      }
    } else {
      await this.cityRepository.save({
        name: cityInfo.name,
        lat: cityInfo.lat,
        lon: cityInfo.lon,
        country: cityInfo.country,
        state: cityInfo.state,
      });
      const res = await this.cityRepository.findOneBy({
        lat: cityInfo.lat,
        lon: cityInfo.lon,
      });
      await this.userCityRepository.save({
        cityId: res.id,
        userid: cityInfo.userId,
      });
    }

    return {
      success: true,
    };
  }

  async getUserCitiesId(userId: number) {
    const userCitiesId = await this.userCityRepository.findBy({
      userid: userId,
    });
    return userCitiesId.map((obj) => ({
      cityId: obj.cityId,
    }));
  }

  async deleteCity(userId: number, cityId: number) {
    const rowToDelete = await this.userCityRepository.findOneBy({
      cityId,
      userid: userId,
    });
    await this.userCityRepository.delete(rowToDelete.id);
    return {
      success: true,
    };
  }

  async getWeatherForecast(cityId: number) {
    const city = await this.cityRepository.findOneBy({ id: cityId });
    return this.weatherForecastApi.getForecast(city.lat, city.lon).pipe(
      map((res) => ({
        name: city.name,
        country: city.country,
        state: city.state,
        weatherForecast: res.data.daily.map((obj) => ({
          humidity: obj.humidity,
          windSpeed: obj.wind_speed,
          temp: {
            tempDay: obj.temp.day,
            tempNight: obj.temp.night,
          },
          weather: {
            main: obj.weather[0].main,
            description: obj.weather[0].description,
          },
        })),
      })),
    );
  }
}
