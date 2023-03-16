import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { existedUsers } from './constants';

@Injectable()
export class UsersService {
  private readonly users: User[] = existedUsers;

  async findOne( username: string, password: string ): Promise< User | undefined > {
    return this.users.find( (user) => user.username === username && user.password === password );
  }
}
