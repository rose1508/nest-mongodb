/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService){}
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }
  @Get()
  findAll()  {
    return this.userService.findAllUser();
  }
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.viewUser(username);
  }
  @Patch(':username')
  async update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    
    return await this.userService.updateUser(username, updateUserDto);
  }
  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.userService.removeUser(username);
  }
}
