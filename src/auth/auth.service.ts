import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../typeorm/entities/User';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/servces/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async createToken(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id };
    return this.jwtService.signAsync(payload);
  }
}
