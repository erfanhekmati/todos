import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../../auth/domain';
import { TodoItem } from './todo-item.schema';

export type TodoListDocument = TodoList & Document;

@Schema()
export class TodoList {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'TodoItem' }],
    default: [],
  })
  todoItems: string[];
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
