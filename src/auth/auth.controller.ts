/* eslint-disable prettier/prettier */
import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUP(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }
  @Post('signin')
  async signIn(@Body('username') username: string, @Body('password') password: string) {
    return await this.authService.signIn(username, password);

  }
}
