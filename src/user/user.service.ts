import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly user: User;

  isUniqueAccount(account: string): boolean {
    if (account == '666') {
      return true;
    }
    return false;
  }
}
