import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role, SignUpDto, Tokens, UserInterface } from '../../domain';
import {
  CreateUserCommand,
  FindUserByIdCommand,
  FindUserByEmailCommand,
} from '../commands';
import { hashData } from '../../../common/utils';

@Injectable()
export class AuthService {
  constructor(
    private commandBus: CommandBus,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signUp({
    email,
    password,
    firstName,
    lastName,
  }: SignUpDto): Promise<Tokens> {
    // Hash the password
    const hashedPass = await hashData(password);

    // Check email
    if (await this.commandBus.execute(new FindUserByEmailCommand(email)))
      throw new BadRequestException('Email is already taken.');

    // Create the user
    const newUser = await this.commandBus.execute(
      new CreateUserCommand(firstName, lastName, email, hashedPass, [
        Role.USER,
      ]),
    );

    // Generate JWT tokens
    const tokens = await this.getTokens(
      newUser._id,
      newUser.email,
      newUser.roles as Role[],
    );

    return tokens;
  }

  public async signIn(username: string, password: string): Promise<Tokens> {
    // Validate user
    const user = await this.validateUser(username, password);
    if (!user)
      throw new UnauthorizedException('Email or password is incorrect.');

    // Get new tokens
    const tokens = await this.getTokens(
      String(user._id),
      user.email,
      user.roles as Role[],
    );

    return tokens;
  }

  public async findMe(userId: string): Promise<{
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  }> {
    const user = await this.commandBus.execute(new FindUserByIdCommand(userId));
    if (!user) throw new UnauthorizedException();
    const { _id, email, firstName, lastName } = user;

    return { _id, email, firstName, lastName };
  }

  public async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.commandBus.execute(new FindUserByIdCommand(userId));
    if (!user) throw new ForbiddenException('Access denied.');

    // Get new tokens
    const tokens = await this.getTokens(
      user._id,
      user.email,
      user.roles as Role[],
    );

    return tokens;
  }

  private async getTokens(
    userId: string,
    email: string,
    roles: Role[],
  ): Promise<Tokens> {
    return {
      access_token: await this.jwtService.sign(
        { userId, email, roles },
        {
          secret: this.configService.get('jwt.access.secret'),
          expiresIn: this.configService.get('jwt.access.exp'),
        },
      ),
      refresh_token: await this.jwtService.sign(
        { userId, email, roles },
        {
          secret: this.configService.get('jwt.refresh.secret'),
          expiresIn: this.configService.get('jwt.refresh.exp'),
        },
      ),
    };
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<UserInterface | null> {
    const user = await this.commandBus.execute<
      FindUserByEmailCommand,
      UserInterface
    >(new FindUserByEmailCommand(email));
    if (user) {
      const passMatches = await bcrypt.compare(password, user.password);
      if (passMatches) return user;
    }
    return null;
  }
}
