import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.usersService.findByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    user: any,
  ): Promise<{ accessToken: string; uid: string; username: string }> {
    const payload = { username: user.username, uid: user.userId };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, uid: user.userId, username: user.username };
  }

  async renewToken(
    token: string,
  ): Promise<{ accessToken: string; uid: string; username: string }> {
    try {
      const decodedToken = this.jwtService.verify(token);

      const user = await this.usersService.findByUsername(
        decodedToken.username,
      );

      const newTokenPayload = { username: user.username, uid: user.userId };
      const newAccessToken = this.jwtService.sign(newTokenPayload);

      return {
        accessToken: newAccessToken,
        uid: user.userId,
        username: user.username,
      };
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
