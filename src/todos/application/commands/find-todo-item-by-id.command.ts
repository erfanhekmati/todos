import { ICommand } from '@nestjs/cqrs';

export class FindTodoItemByIdCommand implements ICommand {
  constructor(public readonly options: { _id: string }) {}
}
