import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'john.williams@gmail.com' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email is invalid.' })
  @MinLength(5, { message: 'Email should be at least 5 characters.' })
  @MaxLength(100, { message: 'Email should be at most 100 characters.' })
  @Transform(({ value }: TransformFnParams) => value?.toLowerCase().trim())
  email: string;

  @ApiProperty({ example: 'John@1990' })
  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password should be string.' })
  @MaxLength(100, { message: 'Password should be at most 100 characters.' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
    },
    { message: 'Password is not strong.' },
  )
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty({ message: 'First name is required.' })
  @IsString({ message: 'First name should be string.' })
  @MinLength(3, { message: 'First name should be at least 3 characters.' })
  @MaxLength(50, { message: 'First name should be at most 50 characters.' })
  @Transform(({ value }: TransformFnParams) => value?.toLowerCase().trim())
  firstName: string;

  @ApiProperty({ example: 'Williams' })
  @IsNotEmpty({ message: 'Last name is required.' })
  @IsString({ message: 'Last name should be string.' })
  @MinLength(3, { message: 'Last name should be at least 3 characters.' })
  @MaxLength(50, { message: 'Last name should be at most 50 characters.' })
  @Transform(({ value }: TransformFnParams) => value?.toLowerCase().trim())
  lastName: string;
}
