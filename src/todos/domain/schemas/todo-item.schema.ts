import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TodoList } from './todo-list.schema';

export type TodoItemDocument = TodoItem & Document;

@Schema()
export class TodoItem {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  priority: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'TodoList',
    required: true,
  })
  todoList: TodoList;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
