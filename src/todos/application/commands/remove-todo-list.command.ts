import { ICommand } from '@nestjs/cqrs';

export class RemoveTodoListCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly _id: string,
  ) {}
}
