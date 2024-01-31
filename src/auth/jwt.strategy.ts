/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
// jwt.strategy.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/user-login.dto';
import { Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService,
    private readonly jwtService:JwtService,
    ) {
    super({
      jwtFromRequest: (req)=>{
        const token = req.headers.authorization?.replace('Bearer','');
        return token||null;
      },
      secretOrKey: jwtConstants.SECRET_KEY,
    });
  }
  async validate(payload:string):Promise<LoginUserDto>{
    const decodedToken:any=this.jwtService.decode(payload);
    const {username}=decodedToken;
    const user = await this.authService.validateUser(username);
    if(!user){
      throw new HttpException('Invalid token',HttpStatus.UNAUTHORIZED);
    }
    return user;
    
  }
}
