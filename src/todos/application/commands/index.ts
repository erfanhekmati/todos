export * from './create-todo-list.command';
export * from './find-all-todo-lists.command';
export * from './find-todo-list-by-id.command';
export * from './add-todo-item.command';
export * from './remove-todo-item.command';
export * from './remove-todo-list.command';
export * from './find-todo-item-by-id.command';
export * from './update-todo-list.command';
export * from './update-todo-item.command';

import { CreateTodoListCommand } from './create-todo-list.command';
import { FindAllTodoListsCommand } from './find-all-todo-lists.command';
import { FindTodoListByIdCommand } from './find-todo-list-by-id.command';
import { AddTodoItemCommand } from './add-todo-item.command';
import { RemoveTodoItemCommand } from './remove-todo-item.command';
import { RemoveTodoListCommand } from './remove-todo-list.command';
import { FindTodoItemByIdCommand } from './find-todo-item-by-id.command';
import { UpdateTodoListCommand } from './update-todo-list.command';
import { UpdateTodoItemCommand } from './update-todo-item.command';

export const commands = [
  CreateTodoListCommand,
  FindAllTodoListsCommand,
  FindTodoListByIdCommand,
  AddTodoItemCommand,
  RemoveTodoItemCommand,
  RemoveTodoListCommand,
  FindTodoItemByIdCommand,
  UpdateTodoListCommand,
  UpdateTodoItemCommand,
];
