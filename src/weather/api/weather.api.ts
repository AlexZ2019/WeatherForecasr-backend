import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export default class WeatherApi {
  constructor(
    private httpService: HttpService,
  ) {}

  findCity(city: string): Observable<AxiosResponse> {
    return this.httpService.get(
      `geo/1.0/direct?q=${city}&limit=5`,
    );
  }

  getForecast(lat: string, lon: string): Observable<AxiosResponse> {
    return this.httpService.get(
      `data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts,current`,
    );
  }
}
