import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  AuthController,
  AuthService,
  commands,
  handlers,
  AtStrategy,
  RtStrategy,
  usersRepository,
} from '../application';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../domain';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
  ],
  providers: [
    AuthService,
    usersRepository,
    JwtService,
    AtStrategy,
    RtStrategy,
    ...handlers,
    ...commands,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
