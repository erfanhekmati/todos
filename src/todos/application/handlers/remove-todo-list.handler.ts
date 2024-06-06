import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveTodoListCommand } from '../commands';
import { TodoListsRepository } from '../repositories';

@CommandHandler(RemoveTodoListCommand)
export class RemoveTodoListHandler
  implements ICommandHandler<RemoveTodoListCommand>
{
  constructor(private readonly todoListsRepository: TodoListsRepository) {}

  async execute({ _id, userId }: RemoveTodoListCommand) {
    return await this.todoListsRepository.remove(userId, _id);
  }
}
