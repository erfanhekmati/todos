import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateTodoItemDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Description should be string.' })
  @MinLength(5, { message: 'Description should be at least 5 characters.' })
  @MaxLength(500, { message: 'Description should be at most 500 characters.' })
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Priority should be equal or greater than 0.' })
  priority: number;
}
