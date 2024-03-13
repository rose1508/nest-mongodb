/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {  PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.gaurd';
import { jwtConstants } from 'src/common/constants';
@Module({
  imports: [UserModule,PassportModule,JwtModule.register({
    global: true,
    secret: jwtConstants.SECRET_KEY,
    signOptions: {expiresIn: Math.floor((new Date().setHours(23, 59, 59, 0) - Date.now()) / 1000 )},
    //signOptions: {expiresIn:'6h'},
  }),
],
  providers: [AuthService, JwtStrategy,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  ],
  exports: [AuthService,JwtStrategy],
  controllers: [AuthController],
})

export class AuthModule {}
