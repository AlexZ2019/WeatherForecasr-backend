import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Mutation} from "@nestjs/graphql";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // return this.appService.getHello();
    return "Test";
  }

}
