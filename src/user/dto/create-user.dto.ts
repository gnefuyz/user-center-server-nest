import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'admin', description: '用户名' })
  @IsNotEmpty()
  @IsString()
  readonly account: string;

  @ApiProperty({ example: '123456', description: '密码' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
