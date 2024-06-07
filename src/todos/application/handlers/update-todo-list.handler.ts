import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from '../commands';
import { TodoListsRepository } from '../repositories';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler
  implements ICommandHandler<UpdateTodoListCommand>
{
  constructor(private readonly todoListsRepository: TodoListsRepository) {}

  async execute({ title, _id }: UpdateTodoListCommand) {
    return await this.todoListsRepository.update(_id, title);
  }
}
