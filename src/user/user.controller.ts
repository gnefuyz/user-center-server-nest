import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { IsAvailableUserDto } from './dto/is-available-user.dto';
import { UserService } from './user.service';

@ApiTags('用户管理')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: '验证新账号是否可用' })
  @Get('/isAvailable')
  async isAvailable(
    @Query() isAvailableUserDto: IsAvailableUserDto,
  ): Promise<boolean> {
    return await this.userService.isAvailable(isAvailableUserDto.account);
  }

  @ApiOperation({ summary: '查询所有用户' })
  @Get('/findAll')
  async findAll() {
    return await this.userService.findAll();
  }
}
