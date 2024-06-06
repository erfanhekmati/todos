import { Role } from '../enums';

export class UserInterface {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roles: Role[];
}
