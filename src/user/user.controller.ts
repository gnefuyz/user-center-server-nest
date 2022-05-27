import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorator/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('用户管理')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({ summary: '创建用户' })
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: '查询单个用户' })
  @Get('')
  async getUser(@Query('account') account: string) {
    const targetUser = await this.userService.getUser(account);
    if (targetUser) {
      return targetUser;
    } else {
      return {
        code: -1,
        data: {},
        message: '用户不存在',
      };
    }
  }

  @ApiOperation({ summary: '查询所有用户' })
  @Get('/findAll')
  async getUserList() {
    return await this.userService.getUserList();
  }

  @Public()
  @ApiOperation({ summary: '验证账号是否已存在' })
  @Get('/isExists:account')
  async isExists(@Param('account') account: string): Promise<boolean> {
    console.log(account);
    return await this.userService.isExists(account);
  }
}
