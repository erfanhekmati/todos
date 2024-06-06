import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList } from '../../domain';

@Injectable()
export class TodoListsRepository {
  constructor(
    @InjectModel(TodoList.name)
    private readonly todoListsModel: Model<TodoList>,
  ) {}

  public async findById({ _id, userId }: { _id: string; userId?: string }) {
    return await this.todoListsModel
      .findOne({
        _id,
        ...(userId && { user: userId }),
      })
      .populate('todoItems');
  }

  public async findAll({ userId }: { userId?: string }) {
    return await this.todoListsModel
      .find({ ...(userId && { user: userId }) })
      .populate({
        path: 'todoItems',
        options: { sort: { priority: -1 } },
      });
  }

  public async create(userId: string, title: string) {
    return await this.todoListsModel.create({ user: userId, title });
  }

  public async remove(userId: string, _id: string) {
    const list = await this.findById({ _id, userId });
    await this.todoListsModel.deleteOne({ _id });
    return list;
  }

  public async addItemId(_id: string, itemId: string) {
    const list = await this.todoListsModel.findOne({ _id });
    list.todoItems.push(itemId);
    await list.save();
    return list;
  }

  public async removeItemId(_id: string, itemId: string) {
    const list = await this.todoListsModel.findOne({ _id });
    list.todoItems = list.todoItems.filter((item) => item != itemId);
    await list.save();
    return list;
  }
}
