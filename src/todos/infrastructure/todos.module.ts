import { Module } from '@nestjs/common';
import {
  TodoItemsRepository,
  TodosController,
  TodosService,
} from '../application';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItem, TodoItemSchema, TodoList, TodoListSchema } from '../domain';
import { handlers, commands, TodoListsRepository } from '../application';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
    ]),
    MongooseModule.forFeature([
      { name: TodoItem.name, schema: TodoItemSchema },
    ]),
    CqrsModule,
  ],
  providers: [
    TodosService,
    TodoListsRepository,
    TodoItemsRepository,
    ...handlers,
    ...commands,
  ],
  controllers: [TodosController],
})
export class TodosModule {}
