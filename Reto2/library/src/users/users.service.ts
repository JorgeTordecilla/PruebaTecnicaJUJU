import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    { userId: 10, username: 'user', password: 'password' },
  ];

  findByUsername(username: string): any {
    return this.users.find((user) => user.username === username);
  }
}
