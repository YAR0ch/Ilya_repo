import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUser(@Request() req) {
    return req.user;
  }
}
