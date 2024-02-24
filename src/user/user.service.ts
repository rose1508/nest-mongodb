/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Injectable, ConflictException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/user-login.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
   @InjectModel('User') private userModel: Model<User>
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.find({email:createUserDto.email});
    if (existingUser.length) {
      throw new ConflictException('User with this email already exists');
    }
    const user= await new this.userModel(createUserDto);
    return user.save();
  }
async findAllUser(): Promise<User[]> {
    return  await this.userModel.find();
  }
  async viewUser(username: string):Promise<User> {
      const user= await this.userModel.find({username}).exec();
      return user[0];
    }
  // private async saveUserDataToDatabase(userData: {
  //   username: string;
  //   email: string;
  //   password: string
  // }): Promise<User> {
  //   const newUser = new User();
  //   newUser.username = userData.username;
  //   newUser.email = userData.email;
  //   newUser.password = await this.hashPassword(userData.password);
  //   const newUser= this.userModel (newUser);
  // }
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 20;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }
  async updateUser(username: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user=await this.userModel.findByIdAndUpdate(username,updateUserDto,{new:true});

    if(!user){
      throw new NotFoundException("user not found");
    }

    return user;
  }
  async removeUser(username: string): Promise<User> {
    const user=await this.userModel.findByIdAndDelete(username);
    if(!user){
      throw new NotFoundException("user not found");
    }

    return user;
  }
  async findByLogin({ username, password }: LoginUserDto): Promise<LoginUserDto> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException(`User with username ${username} not found`, HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
  
async findByPayload({ username }: any): Promise<LoginUserDto> {
  return await this.userModel.findById( username );
}
async getUserById(id: number): Promise<User>{
  return this.userModel.findById(id).populate('connection').exec();
}}