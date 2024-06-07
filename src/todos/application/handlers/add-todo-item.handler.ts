import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddTodoItemCommand } from '../commands';
import { TodoItemsRepository, TodoListsRepository } from '../repositories';

@CommandHandler(AddTodoItemCommand)
export class AddTodoItemHandler implements ICommandHandler<AddTodoItemCommand> {
  constructor(
    private readonly todoItemsRepository: TodoItemsRepository,
    private readonly todoListsRepository: TodoListsRepository,
  ) {}

  async execute({ description, priority, todoListId }: AddTodoItemCommand) {
    const item = await this.todoItemsRepository.create(
      description,
      priority,
      todoListId,
    );
    await this.todoListsRepository.addItemId(todoListId, String(item._id));
    return item;
  }
}
