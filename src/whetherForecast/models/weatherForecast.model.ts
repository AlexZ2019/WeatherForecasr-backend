import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Temp {
  @Field()
  tempDay: number

  @Field()
  tempNight: number
}


@ObjectType()
export class DailyWeatherForecastModel {

  @Field()
  humidity: number

  @Field()
  windSpeed: number

  @Field()
  clouds: number

  @Field(() => Temp)
  temp: [Temp];
}

@ObjectType ()
export class WeatherForecastModel {

  @Field()
  name: string

  @Field()
  state: string

  @Field()
  country: string

  @Field(() => [DailyWeatherForecastModel])
  weatherForecast: DailyWeatherForecastModel
}
