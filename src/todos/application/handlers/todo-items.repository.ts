import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem } from '../../domain';

@Injectable()
export class TodoItemsRepository {
  constructor(
    @InjectModel(TodoItem.name)
    private readonly todoItemsModel: Model<TodoItem>,
  ) {}

  public async findById({ _id, userId }: { _id: string; userId?: string }) {
    return await this.todoItemsModel.findOne({
      _id,
      ...(userId && { user: userId }),
    });
  }

  public async create(
    description: string,
    priority: number,
    todoListId: string,
  ) {
    return await this.todoItemsModel.create({
      description,
      priority,
      todoList: todoListId,
    });
  }

  public async remove(userId: string, _id: string) {
    const item = await this.findById({ _id, userId });
    console.log('item: ', item);
    await this.todoItemsModel.deleteOne({ _id });
    return item;
  }
}
