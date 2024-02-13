/* eslint-disable prettier/prettier */
import { Controller, Body, Post, HttpCode, HttpStatus,Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { Public } from 'src/decorator/public.decorator';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUP(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }
  @Public()
  @Post('signin')
  async signIn(@Body('username') username: string, @Body('password') password: string) {
    console.log("hey");
    return await this.authService.signIn(username, password);
  }
   @UseGuards(AuthGuard)
  @Get('profile')
  async Profile(@Req() req) {
    return await this.authService.profile(req.id);
  }
}
