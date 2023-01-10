import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '👋🏻 Hello! Look at the README file here [in development]';
  }
}
