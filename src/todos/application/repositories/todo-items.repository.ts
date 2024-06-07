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

  public async findById({ _id }: { _id: string }) {
    return await this.todoItemsModel.findOne({
      _id,
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

  public async update(
    _id: string,
    newFields: { description?: string; priority?: number },
  ) {
    const item = await this.todoItemsModel.findOne({ _id });
    Object.assign(item, newFields);
    await item.save();
    return item;
  }

  public async remove(_id: string) {
    const item = await this.findById({ _id });
    await this.todoItemsModel.deleteOne({ _id });
    return item;
  }
}
