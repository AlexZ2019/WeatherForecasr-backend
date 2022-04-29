import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city';
import { WeatherForecastApi } from './api/weatherForecastApi';
import { CityArgs } from './dto/city';
import { map, tap } from 'rxjs';
import { AddCityArgs } from './dto/addCity';
import { UserCity } from './entities/userСity';

@Injectable()
export class WeatherForecastService {
  constructor(@InjectRepository(City) private readonly cityRepository: Repository<City>,
              @InjectRepository(UserCity) private readonly userCityRepository: Repository<UserCity>,
              private readonly weatherForecastApi: WeatherForecastApi) {
  }

  async findCity(cityArgs: CityArgs): Promise<any | undefined> {
    const res = await this.weatherForecastApi.findCity(cityArgs.city);
    return res.pipe(
      map((resp) => {
        return resp.data.map(obj => {
          return {
            name: obj.name,
            country: obj.country,
            state: obj.state,
            lat: obj.lat,
            lon: obj.lon
          };
        });
      })
    );
  };

  async addCity(cityInfo: AddCityArgs) {
    const res = await this.cityRepository.findOneBy({
      lat: cityInfo.lat,
      lon: cityInfo.lon
    });
    try {
      const isCityAdded = await this.userCityRepository.findOneBy({
        cityId: res.id,
        userid: cityInfo.userId
      });
      if (Boolean(isCityAdded)) {
        return new Error('This city has already been added');
      }
    }
    catch {
      if (res) {
        try {
          await this.userCityRepository.save({ cityId: res.id, userid: cityInfo.userId });
        } catch (err) {
          throw err;
        }
      } else {
        try {
          await this.cityRepository.save({
            name: cityInfo.name,
            lat: cityInfo.lat,
            lon: cityInfo.lon,
            country: cityInfo.country,
            state: cityInfo.state
          });
          const res = await this.cityRepository.findOneBy({
            lat: cityInfo.lat,
            lon: cityInfo.lon
          });
          await this.userCityRepository.save({
            cityId: res.id,
            userid: cityInfo.userId
          });
        } catch (err) {
          throw err;
        }
      }
    }

    return {
      success: true
    };
  }

  async getUserCitiesId(userId: number) {
    const userCitiesId = await this.userCityRepository.findBy({ userid: userId });
    return userCitiesId.map((obj) => {
      return {
        cityId: obj.cityId
      };
    });
  }

  async deleteCity(userId: number, cityId: number) {
    const rowToDelete = await this.userCityRepository.findOneBy({ cityId, userid: userId });
    await this.userCityRepository.delete(rowToDelete.id);
    return {
      success: true
    };
  }

  async getWeatherForecast(cityId: number) {
    const city = await this.cityRepository.findOneBy({ id: cityId });
    return this.weatherForecastApi.getForecast(city.lat, city.lon).pipe(
      map(res => {
        return {
          name: city.name,
          country: city.country,
          state: city.state,
          weatherForecast: res.data.daily.map((obj) => {
            return {
              humidity: obj.humidity,
              windSpeed: obj.wind_speed,
              temp: {
                tempDay: obj.temp.day,
                tempNight: obj.temp.night
              },
              clouds: obj.clouds
            };
          })
        };
      })
    );
  }
}
