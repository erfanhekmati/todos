import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../commands';
import { TodoListsRepository } from '../repositories';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(private readonly todoListsRepository: TodoListsRepository) {}

  async execute({ title, userId }: CreateTodoListCommand) {
    return await this.todoListsRepository.create(userId, title);
  }
}
