/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService){}
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.createUser(createUserDto);
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
    const existingUser = await this.userService.viewUser(username);
    if (!existingUser) {
      throw new ConflictException('User with this email already exists');

    }
    existingUser.name = updateUserDto.name;
  existingUser.age = updateUserDto.age;
  existingUser.email = updateUserDto.email;
  existingUser.password = updateUserDto.password;
    return await this.userService.updateUser(username, existingUser);
  }
  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.userService.removeUser(username);
  }
}
