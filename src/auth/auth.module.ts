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
@Module({
  imports: [UserModule,PassportModule,JwtModule.register({
    global: true,
    secret: 'jwtConstants.secret',
    signOptions: {expiresIn: '2h'},
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
