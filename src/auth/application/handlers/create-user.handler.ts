import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCommand } from '../commands';
import { usersRepository } from '../repositories';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly usersRepository: usersRepository) {}

  async execute({
    email,
    firstName,
    lastName,
    password,
    roles,
  }: CreateUserCommand) {
    return await this.usersRepository.create(
      email,
      firstName,
      lastName,
      password,
      roles,
    );
  }
}
