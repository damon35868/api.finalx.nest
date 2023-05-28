import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { phone } = createUserDto;

    const hasUser = await this.userRepository.findOneBy({ phone });
    if (hasUser)
      throw new HttpException('该用户已存在', HttpStatus.BAD_REQUEST);

    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({
      select: ['id', 'createDate', 'name', 'phone', 'updateDate'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'createDate', 'name', 'phone', 'updateDate'],
    });

    if (!user) throw new NotFoundException('找不到该用户');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // const _id = new ObjectId(id);
    const row = await this.userRepository.findOneBy({ id });
    if (!row) throw new NotFoundException('找不到该用户');

    const updateUser = await this.userRepository.preload({
      ...row,
      ...updateUserDto,
    });

    return await this.userRepository.save(updateUser);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async getUser(query: object): Promise<User> {
    return this.userRepository.findOneBy(query);
  }
}
