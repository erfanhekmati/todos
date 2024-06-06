import { ICommand } from '@nestjs/cqrs';

export class FindUserByIdCommand implements ICommand {
  constructor(public readonly userId: string) {}
}
