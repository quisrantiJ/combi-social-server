import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { UserDocument } from './models/schemas/user.schema';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any): Promise<any> {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('auth/signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    const rounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, rounds);

    return this.usersService.create(createUserDto);
  }
}
