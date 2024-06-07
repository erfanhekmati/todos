import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from '../commands';
import { TodoItemsRepository } from '../repositories';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler
  implements ICommandHandler<UpdateTodoItemCommand>
{
  constructor(private readonly todoItemsRepository: TodoItemsRepository) {}

  async execute({ newFields, _id }: UpdateTodoItemCommand) {
    return await this.todoItemsRepository.update(_id, newFields);
  }
}
