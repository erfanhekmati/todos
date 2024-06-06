import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FindTodoListByIdCommand } from '../commands';
import { TodoListsRepository } from '../repositories';

@CommandHandler(FindTodoListByIdCommand)
export class FindTodoListByIdHandler
  implements ICommandHandler<FindTodoListByIdCommand>
{
  constructor(private readonly todoListsRepository: TodoListsRepository) {}

  async execute({ options }: FindTodoListByIdCommand) {
    const { _id, userId } = options;
    return await this.todoListsRepository.findById({ _id, userId });
  }
}
