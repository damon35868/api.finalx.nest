import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthPublic } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @AuthPublic()
  @Post('signup')
  create(@Body() signupDto: CreateUserDto) {
    return this.authService.create(signupDto);
  }

  @AuthPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const { phone, password } = loginDto;
    const user = await this.authService.validateUser(phone, password);

    return {
      user,
      accessToken: this.jwtService.sign(
        { phone, sub: user.id },
        { secret: process.env.JWT_SECRET },
      ),
    };
  }
}
