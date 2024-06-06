import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TodoList } from '../../../todos/domain';
import { Role } from '../enums';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], enum: Role, required: true })
  roles: Role[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'TodoList' }] })
  todoLists: TodoList[];
}

export const UserSchema = SchemaFactory.createForClass(User);
