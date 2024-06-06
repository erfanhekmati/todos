import { ICommand } from '@nestjs/cqrs';

export class RemoveTodoItemCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly _id: string,
  ) {}
}
