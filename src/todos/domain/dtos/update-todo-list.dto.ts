import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoListDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
