import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class IsAvailableUserDto {
  @ApiProperty({ example: 'admin', description: '用户名' })
  @IsNotEmpty()
  @IsString()
  readonly account: string;
}
