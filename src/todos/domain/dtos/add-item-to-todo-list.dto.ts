import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class AddItemToTodoListDto {
  @ApiProperty({ example: 'My first todo item' })
  @IsNotEmpty({ message: 'Description is required.' })
  @IsString({ message: 'Description should be string.' })
  @MinLength(5, { message: 'Description should be at least 5 characters.' })
  @MaxLength(500, { message: 'Description should be at most 500 characters.' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;

  @ApiProperty({ example: 0 })
  @IsNotEmpty({ message: 'Priority is required.' })
  @IsNumber()
  @Min(0, { message: 'Priority should be equal or greater than 0.' })
  priority: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Todo list id is required.' })
  @IsString({ message: 'Todo list id should be string.' })
  @Length(24)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  todoListId: string;
}
