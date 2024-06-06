import { ICommand } from '@nestjs/cqrs';

export class FindUserByEmailCommand implements ICommand {
  constructor(public readonly email: string) {}
}
