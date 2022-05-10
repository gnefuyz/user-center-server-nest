import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { HmacSHA1 } from 'crypto-js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 验证账号是否合法
    if (!(await this.isAvailable(createUserDto.account))) {
      throw new HttpException('用户已存在', 400);
    }
    const salt = this.mackSalt();
    const securityPassword = HmacSHA1(createUserDto.password, salt).toString();
    const newUser = await this.userRepository.save({
      ...createUserDto,
      password: securityPassword,
      salt,
    });
    return newUser.account;
  }

  async findAll() {
    const usersData = await this.userRepository.find();
    return usersData;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // 验证账号是否合法
  async isAvailable(account: string): Promise<boolean> {
    const count = await this.userRepository.count({ account: account });
    return count === 0;
  }

  // 生成随机盐
  private mackSalt(length = 16) {
    let salt = '';
    while (length) {
      const char = String.fromCharCode(Math.random() * (127 - 32) + 32);
      if (char !== '') {
        salt += char;
        length--;
      }
    }
    return salt;
  }
}
