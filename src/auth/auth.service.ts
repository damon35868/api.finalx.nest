import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.userService.getUser({ phone });
    if (!user) throw new NotFoundException('用户不存在');

    const { password: userPassword, ...userInfo } = user;
    const passwordValid = await bcrypt.compare(password, userPassword);
    if (!passwordValid) throw new NotAcceptableException('用户密码错误');

    return userInfo;
  }
}
