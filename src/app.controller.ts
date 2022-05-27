import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './core/decorator/public.decorator';
import { UserEntity } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: { user: Omit<UserEntity, 'salt' | 'password'> }) {
    return this.authService.login(req.user);
  }
}
