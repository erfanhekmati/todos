import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FindTodoItemByIdCommand } from '../commands';
import { TodoItemsRepository } from '../repositories';

@CommandHandler(FindTodoItemByIdCommand)
export class FindTodoItemByIdHandler
  implements ICommandHandler<FindTodoItemByIdCommand>
{
  constructor(private readonly todoItemsRepository: TodoItemsRepository) {}

  async execute({ options }: FindTodoItemByIdCommand) {
    const { _id } = options;
    return await this.todoItemsRepository.findById({ _id });
  }
}
