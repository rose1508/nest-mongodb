/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable, NotAcceptableException, forwardRef } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
     @Inject(forwardRef(( )=>UserService) ) 
    private readonly userService:UserService ,
      private readonly jwtservice: JwtService){}
  async generateToken(username: string): Promise<string> {
    const payload:JwtPayload = { sub: username };
    return  this.jwtservice.sign(payload);
  }
  async verifyToken(token: string): Promise<any> {
    return  this.jwtservice.verify(token);
  }
  async signUp(createUserDto:CreateUserDto): Promise<User> {
    try {
      const  user:User = await this.userService.create(createUserDto);
      return user;
    }
    catch(error){
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }

  }
  async signIn(username: string, password: string): Promise<string> {
    const user = await this.userService.viewUser(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.generateToken(username);
    }else{
      throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);

    }
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 20;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }
  async validateUser(username: string ): Promise<any> {
    const user = await this.userService.viewUser( username );
    if (!user) return null;
    if (!user) {
        throw new NotAcceptableException('could not find the user');
    }
    if (user ) {
        return user;
    }
    return null;
}

}

