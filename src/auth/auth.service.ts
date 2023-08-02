import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;

    return result;
  }

  async login(user: User): Promise<any> {
    const payload = {
      username: user.username,
      sub: user.id,
      // TODO: change back when testing is figured out
      // roles: user.roles,
      roles: 'ADMIN',
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
