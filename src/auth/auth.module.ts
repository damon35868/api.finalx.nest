import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '2h' },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
