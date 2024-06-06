import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTodoListDto {
  @ApiProperty({ example: 'My first todo list' })
  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title should be string.' })
  @MinLength(5, { message: 'Title should be at least 5 characters.' })
  @MaxLength(100, { message: 'Title should be at most 100 characters.' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  title: string;
}
