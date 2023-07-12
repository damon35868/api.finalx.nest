import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthPublic } from './auth/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AuthPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
