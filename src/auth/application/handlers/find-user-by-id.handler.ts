import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FindUserByIdCommand } from '../commands';
import { ObjectId } from 'mongodb';
import { usersRepository } from '../repositories';

@CommandHandler(FindUserByIdCommand)
export class FindUserByIdHandler
  implements ICommandHandler<FindUserByIdCommand>
{
  constructor(private readonly usersRepository: usersRepository) {}

  async execute({ userId }: FindUserByIdCommand) {
    return await this.usersRepository.findById(userId);
  }
}
