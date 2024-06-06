import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, User } from '../../domain';

@Injectable()
export class usersRepository {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  public async findById(_id: string) {
    return await this.usersModel.findOne({ _id });
  }

  public async findByEmail(email: string) {
    return await this.usersModel.findOne({ email });
  }

  public async create(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    roles: Role[],
  ) {
    return await this.usersModel.create({
      email,
      firstName,
      lastName,
      password,
      roles,
    });
  }
}
