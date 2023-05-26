import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user/entities/user.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
