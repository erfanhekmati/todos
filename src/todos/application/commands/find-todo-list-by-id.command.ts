import { ICommand } from '@nestjs/cqrs';

export class FindTodoListByIdCommand implements ICommand {
  constructor(public readonly options: { _id: string; userId?: string }) {}
}
