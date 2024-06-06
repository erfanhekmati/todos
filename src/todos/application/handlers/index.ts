export * from './create-todo-list.handler';
export * from './find-all-todo-lists.handler';
export * from './find-todo-list-by-id.handler';
export * from './add-todo-item.handler';
export * from './remove-todo-item.handler';
export * from './remove-todo-list.handler';
export * from './find-todo-item-by-id.handler';

import { CreateTodoListHandler } from './create-todo-list.handler';
import { FindAllTodoListsHandler } from './find-all-todo-lists.handler';
import { FindTodoListByIdHandler } from './find-todo-list-by-id.handler';
import { AddTodoItemHandler } from './add-todo-item.handler';
import { RemoveTodoItemHandler } from './remove-todo-item.handler';
import { RemoveTodoListHandler } from './remove-todo-list.handler';
import { FindTodoItemByIdHandler } from './find-todo-item-by-id.handler';
export const handlers = [
  CreateTodoListHandler,
  FindAllTodoListsHandler,
  FindTodoListByIdHandler,
  AddTodoItemHandler,
  RemoveTodoItemHandler,
  RemoveTodoListHandler,
  FindTodoItemByIdHandler,
];
