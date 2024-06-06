import { ICommand } from '@nestjs/cqrs';

export class AddTodoItemCommand implements ICommand {
  constructor(
    public readonly description: string,
    public readonly priority: number,
    public readonly todoListId: string,
  ) {}
}
