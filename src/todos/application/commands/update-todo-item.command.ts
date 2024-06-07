import { ICommand } from '@nestjs/cqrs';

export class UpdateTodoItemCommand implements ICommand {
  constructor(
    public readonly _id: string,
    public readonly newFields: { description?: string; priority?: number },
  ) {}
}
