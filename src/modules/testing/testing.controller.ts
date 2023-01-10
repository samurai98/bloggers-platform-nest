import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';

import { TestingService } from './testing.service';

@Controller('testing')
export class TestingController {
  constructor(private readonly service: TestingService) {}

  @Delete('all-data')
  @HttpCode(HttpStatus.NO_CONTENT)
  async dropAll() {
    await this.service.dropAll();
  }
}
