import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserDocument } from '../models/schemas/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<unknown> {
    const user = await this.userService.getUser(username);
    const isValidPassword = await bcrypt.compare(password, user?.password);

    if (user && isValidPassword) {
      delete user.password;

      return user;
    }

    return null;
  }

  login(user: UserDocument): { access_token: string } {
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
