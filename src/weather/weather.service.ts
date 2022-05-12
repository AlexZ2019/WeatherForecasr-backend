import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from 'rxjs';
import City from './entities/city.entity';
import UserCity from './entities/userСity.entity';
import CityArgs from './dto/city.dto';
import WeatherApi from './api/weather.api';
import AddCityArgs from './dto/addCity.dto';
import { CARDS_COUNT } from './constants';

@Injectable()
export default class WeatherService {
  constructor(
    @InjectRepository(City) private readonly cityRepository: Repository<City>,
    @InjectRepository(UserCity)
    private readonly userCityRepository: Repository<UserCity>,
    private readonly weatherApi: WeatherApi
  ) {
  }

  generateCity(city, isAdded) {
    return {
      name: city.name,
      country: city.country,
      state: city.state,
      lat: city.lat,
      lon: city.lon,
      isAdded
    };
  }

  async findCity(cityArgs: CityArgs, userId: number) {
    const foundCities = await this.weatherApi.findCity({q: cityArgs.city, limit: 5});
    const userCities = await this.userCityRepository.findBy({
      userId
    });
    const cityIds = userCities.map((userCity) => userCity.cityId);
    const addedCities = await this.cityRepository.findBy({ id: In(cityIds) });
    return foundCities.pipe(
      map((foundCities) =>
        foundCities.data.map((city) => {
          const isAddedCity = addedCities.some((addedCity) => {
            return Number(addedCity.lat) === city.lat && Number(addedCity.lon === city.lon);
          });
          return this.generateCity(city, isAddedCity);
        })
      )
    );
  }

  async addCity(cityInfo: AddCityArgs, userId: number) {
    const city = await this.cityRepository.findOneBy({
      lat: cityInfo.lat,
      lon: cityInfo.lon
    });
    const userCities = await this.userCityRepository.findBy({
      userId
    });
    if (userCities.length === CARDS_COUNT) {
      return new Error('You can\'t add more than 10 cards');
    }

    if (city) {
      const isCityAdded = userCities.some(
        (userCity) => {
          return userCity.cityId === city.id;
        }
      );

      if (isCityAdded) {
        return new Error('This city has already been added');
      }
      await this.userCityRepository.save({
        cityId: city.id,
        userId
      });
    } else {
     const savedCity = await this.cityRepository.save({
        name: cityInfo.name,
        lat: cityInfo.lat,
        lon: cityInfo.lon,
        country: cityInfo.country,
        state: cityInfo.state
      });
      await this.userCityRepository.save({
        cityId: savedCity.id,
        userId
      });
    }
  }

  async getCitiesIds(userId: number) {
    const citiesIds = await this.userCityRepository.findBy({
      userId
    });
    return citiesIds.map((city) => ({
      cityId: city.cityId
    }));
  }

  async deleteCity(userId: number, cityId: number) {
    const rowToDelete = await this.userCityRepository.findOneBy({
      cityId,
      userId
    });

    return this.userCityRepository.delete(rowToDelete.id);
  }

  async getWeather(cityId: number) {
    const city = await this.cityRepository.findOneBy({ id: cityId });
    return this.weatherApi.getWeather({
      lat: city.lat,
      lon: city.lon,
      units: 'metric',
      exclude: 'minutely,hourly,alerts,current',
    }).pipe(
      map((weather) => ({
        name: city.name,
        country: city.country,
        state: city.state,
        weatherForecast: weather.data.daily.map((day) => ({
          humidity: day.humidity,
          windSpeed: day.wind_speed,
          temp: {
            tempDay: day.temp.day,
            tempNight: day.temp.night
          },
          weather: {
            main: day.weather[0].main,
            description: day.weather[0].description
          }
        }))
      }))
    );
  }
}
