import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export default class WeatherApi {
  constructor(
    private httpService: HttpService,
  ) {}

  findCity(params): Observable<AxiosResponse> {
    return this.httpService.get(
      `geo/1.0/direct`, {
        params
      }
    );
  }

  getWeather(params): Observable<AxiosResponse> {
    return this.httpService.get(
      `data/2.5/onecall`, {
        params
      }
    );
  }
}
