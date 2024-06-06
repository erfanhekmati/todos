import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FindAllTodoListsCommand } from '../commands';
import { ObjectId } from 'mongodb';
import { TodoListsRepository } from '../repositories';

@CommandHandler(FindAllTodoListsCommand)
export class FindAllTodoListsHandler
  implements ICommandHandler<FindAllTodoListsCommand>
{
  constructor(private readonly todoListsRepository: TodoListsRepository) {}

  async execute({ options }: FindAllTodoListsCommand) {
    const { userId } = options;
    return await this.todoListsRepository.findAll({ userId });
  }
}
