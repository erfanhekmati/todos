import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  AddItemToTodoListDto,
  CreateTodoListDto,
  UpdateTodoListDto,
} from '../../domain';
import {
  AddTodoItemCommand,
  CreateTodoListCommand,
  FindAllTodoListsCommand,
  FindTodoItemByIdCommand,
  FindTodoListByIdCommand,
  RemoveTodoItemCommand,
  RemoveTodoListCommand,
  UpdateTodoListCommand,
} from '../commands';

@Injectable()
export class TodosService {
  constructor(private commandBus: CommandBus) {}

  public async findOneList(userId: string, _id: string) {
    const list = await this.commandBus.execute(
      new FindTodoListByIdCommand({ _id, userId }),
    );
    if (!list) throw new NotFoundException('Todo list not found.');
    return list;
  }

  public async findAllLists(userId: string): Promise<CreateTodoListDto[]> {
    return await this.commandBus.execute(
      new FindAllTodoListsCommand({ userId }),
    );
  }

  public async createList(userId: string, { title }: CreateTodoListDto) {
    return await this.commandBus.execute(
      new CreateTodoListCommand(title, userId),
    );
  }

  public async updateList(
    userId: string,
    _id: string,
    { title }: UpdateTodoListDto,
  ) {
    await this.findOneList(userId, _id);
    return await this.commandBus.execute(new UpdateTodoListCommand(_id, title));
  }

  public async findOneItem(_id: string) {
    const item = await this.commandBus.execute(
      new FindTodoItemByIdCommand({ _id }),
    );
    if (!item) throw new NotFoundException('Todo item not found.');
    return item;
  }

  public async addItemToList(
    userId: string,
    { description, priority, todoListId }: AddItemToTodoListDto,
  ) {
    await this.findOneList(userId, todoListId);
    return await this.commandBus.execute(
      new AddTodoItemCommand(description, priority, todoListId),
    );
  }

  public async removeList(userId: string, _id: string) {
    await this.findOneList(userId, _id);
    return await this.commandBus.execute(
      new RemoveTodoListCommand(userId, _id),
    );
  }

  public async removeItemFromList(userId: string, _id: string) {
    const item = await this.findOneItem(_id);
    await this.findOneList(userId, String(item.todoList));
    return await this.commandBus.execute(
      new RemoveTodoItemCommand(userId, _id),
    );
  }
}
