import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty({ message: '电话不能为空' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
