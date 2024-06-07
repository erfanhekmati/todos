import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTodoListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: 'Title should be string.' })
  @MinLength(5, { message: 'Title should be at least 5 characters.' })
  @MaxLength(100, { message: 'Title should be at most 100 characters.' })
  title: string;
}
