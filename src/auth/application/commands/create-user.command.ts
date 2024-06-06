import { ICommand } from '@nestjs/cqrs';
import { Role } from '../../domain';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly roles: Role[],
  ) {}
}
