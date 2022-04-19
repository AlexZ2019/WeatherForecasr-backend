import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

@Injectable()
export class WeatherForecastApi {
  constructor(private httpService: HttpService, private readonly configService: ConfigService) {
  }

  findCity(city: string): Observable<AxiosResponse> {

    return this.httpService.get(
      `${this.configService.get('API_WEATHER_HOST')}
      geo/1.0/direct?q=${city}&limit=5&appid=${this.configService.get('WEATHER_API_KEY')}`);
  }

  getForecast(lat, long): Observable<AxiosResponse> {
    return this.httpService.get(`${this.configService.get('API_WEATHER_HOST')}
      onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely,hourly,alerts,current
      &appid=${this.configService.get('WEATHER_API_KEY')}`);
  }
}
