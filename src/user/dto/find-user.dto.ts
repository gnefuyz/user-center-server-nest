import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationDto } from 'src/core/dto/pagination.dto';

export class FindUserDto extends PaginationDto {
  @ApiProperty({ example: 'admin', description: '用户名' })
  @IsNotEmpty()
  @IsString()
  readonly account: string;
}
