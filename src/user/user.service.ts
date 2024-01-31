/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User} from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/user-login.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.gender = createUserDto.gender;
    return await this.userRepository.save(user);
  }
async findOne(options? : object): Promise<LoginUserDto>{
  const user = await this.userRepository.findOne(options);
  return (user);
}
  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }
  async viewUser(username: string): Promise<User> {
      return this.userRepository.findOne({ where: { username } });
    }
  
  async createUser(userData: { username: string; email: string; password: string }): Promise<User> {
    const user = await this.saveUserDataToDatabase(userData);
    const existingUser = await this.userRepository.findOne({ where:{email: user.email} });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    return await this.userRepository.save(user);
  }
  private async saveUserDataToDatabase(userData: {
    username: string;
    email: string;
    password: string
  }): Promise<User> {
    const newUser = new User();
    newUser.username = userData.username;
    newUser.email = userData.email;
    newUser.password = await this.hashPassword(userData.password);
    return await this.userRepository.save(newUser);
  }
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
    const user: User = new User();
    user.name = updateUserDto.name;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.username = username;
    return await this.userRepository.save(user);

  }
  async removeUser(username: string): Promise<{ affected?: number }> {
    return await this.userRepository.delete(username);
  }
  async findByLogin({ username, password }: LoginUserDto): Promise<LoginUserDto> {    
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
    }
      
    const areEqual = await bcrypt.compare(user.password, password);
    
    if (!areEqual) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
    }
    return (user);  
}
async findByPayload({ username }: any): Promise<LoginUserDto> {
  return await this.findOne({ 
      where:  { username } });  
}
}