import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveTodoItemCommand } from '../commands';
import { TodoItemsRepository, TodoListsRepository } from '../repositories';

@CommandHandler(RemoveTodoItemCommand)
export class RemoveTodoItemHandler
  implements ICommandHandler<RemoveTodoItemCommand>
{
  constructor(
    private readonly todoItemsRepository: TodoItemsRepository,
    private readonly todoListsRepository: TodoListsRepository,
  ) {}

  async execute({ _id, userId }: RemoveTodoItemCommand) {
    const item = await this.todoItemsRepository.remove(_id);
    await this.todoListsRepository.removeItemId(
      String(item.todoList),
      String(item._id),
    );
  }
}
