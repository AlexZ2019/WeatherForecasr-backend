import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Temp {
  @Field()
  tempDay: number;

  @Field()
  tempNight: number;
}

@ObjectType()
class Weather {
  @Field()
  main: string;

  @Field()
  description: string;
}

@ObjectType()
class DailyWeatherForecastModel {
  @Field()
  humidity: number;

  @Field()
  windSpeed: number;

  @Field(() => Temp)
  temp: [Temp];

  @Field(() => Weather)
  weather: [Weather];
}

@ObjectType()
export default class WeatherForecastModel {
  @Field()
  name: string;

  @Field()
  state: string;

  @Field()
  country: string;

  @Field(() => [DailyWeatherForecastModel])
  weatherForecast: DailyWeatherForecastModel;
}
