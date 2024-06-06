import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FindUserByEmailCommand } from '../commands';
import { usersRepository } from '../repositories';

@CommandHandler(FindUserByEmailCommand)
export class FindUserByEmailHandler
  implements ICommandHandler<FindUserByEmailCommand>
{
  constructor(private readonly usersRepository: usersRepository) {}

  async execute({ email }: FindUserByEmailCommand) {
    return await this.usersRepository.findByEmail(email);
  }
}
