import { ICommand } from '@nestjs/cqrs';

export class CreateTodoListCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly userId: string,
  ) {}
}
