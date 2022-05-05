import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('isUniqueAccount')
  isUniqueAccount(@Query('account') account: string): boolean {
    return this.userService.isUniqueAccount(account);
  }
}
