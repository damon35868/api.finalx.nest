import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;
}
