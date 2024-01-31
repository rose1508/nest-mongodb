/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [UserModule,PassportModule,JwtModule.register({
    secret: 'secretKey',
    signOptions: {expiresIn: '2h'},
  }),
],
  providers: [AuthService, JwtStrategy ],
  exports: [AuthService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
