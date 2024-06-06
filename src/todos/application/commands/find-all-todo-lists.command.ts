import { ICommand } from '@nestjs/cqrs';

export class FindAllTodoListsCommand implements ICommand {
  constructor(public readonly options: { userId?: string }) {}
}
