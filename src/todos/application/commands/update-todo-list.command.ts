import { ICommand } from '@nestjs/cqrs';

export class UpdateTodoListCommand implements ICommand {
  constructor(
    public readonly _id: string,
    public readonly title: string,
  ) {}
}
