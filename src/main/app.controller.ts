import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('MAIN MODULE')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'HELLO WORD IN NESTJS' })
  getHello(): string {
    return this.appService.getHello();
  }
}
