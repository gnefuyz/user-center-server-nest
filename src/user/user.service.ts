import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { HmacSHA1 } from 'crypto-js';

export function isExistsMetod(hope = true, index = 0) {
  return function (target: UserService, methodName: string, desc: any) {
    const onMethods = desc.value;
    desc.value = async function (...args: unknown[]) {
      const isExists = await target.isExists.call(this, args[index]['account']);
      if (hope !== isExists) {
        throw new HttpException(`用户${isExists ? '已' : '不'}存在`, 400);
      }
      return onMethods.apply(this, args);
    };
  };
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // 创建账号
  @isExistsMetod(false)
  async create(createUserDto: CreateUserDto) {
    const salt = this.makeSalt();
    const securityPassword = HmacSHA1(createUserDto.password, salt).toString();
    const newUser = await this.userRepository.save({
      ...createUserDto,
      password: securityPassword,
      salt,
    });
    return newUser.account;
  }

  async getUser(account: string) {
    const targetUser = await this.userRepository.findOne({ account });
    return targetUser;
  }

  async getUserList() {
    const usersData = await this.userRepository.find({
      select: [
        'id',
        'account',
        'first_name',
        'last_name',
        'nick_name',
        'thumb_url',
        'create_time',
        'update_time',
      ],
    });
    return usersData;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // 验证账号是否存在
  async isExists(account: string): Promise<boolean> {
    const count = await this.userRepository.count({ account: account });
    return Boolean(count);
  }

  // 生成随机盐
  private makeSalt(length = 16): string {
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
