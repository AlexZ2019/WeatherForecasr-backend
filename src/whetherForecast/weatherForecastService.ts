import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { WeatherForecastApi } from './api/weatherForecastApi';
import { CityArgs } from './dto/args';
import { map, tap } from 'rxjs';

@Injectable()
export class WeatherForecastService {

  constructor(@InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>,
              private readonly weatherForecastApi: WeatherForecastApi) {
  }

  async findCity(cityArgs: CityArgs): Promise<any | undefined> {
    const res = await this.weatherForecastApi.findCity(cityArgs.city);
    return res.pipe(
      tap((data) => console.log(data)),
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


}
