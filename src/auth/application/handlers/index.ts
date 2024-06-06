export * from './create-user.handler';
export * from './find-user-by-id.handler';
export * from './find-user-by-email.handler';

import { CreateUserHandler } from './create-user.handler';
import { FindUserByIdHandler } from './find-user-by-id.handler';
import { FindUserByEmailHandler } from './find-user-by-email.handler';
export const handlers = [
  CreateUserHandler,
  FindUserByIdHandler,
  FindUserByEmailHandler,
];
