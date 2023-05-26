import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PickType(CreateUserDto, ['name']) {
  @IsString()
  @IsOptional()
  password: string;
}
