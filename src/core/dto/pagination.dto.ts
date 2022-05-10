import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min, ValidateIf } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ example: '1', description: '当前页码' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly page: number;

  @ApiProperty({ example: '10', description: '每页数据量' })
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(10)
  @ValidateIf((size: number) => size % 10 === 0, {
    message: 'size只能为10的倍数',
  })
  readonly size: number;
}
