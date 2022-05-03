import { Injectable } from '@nestjs/common';
import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: this.configService.get('API_WHEATHER_HOST'),
    };
  }
}
