/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionController } from './connection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './entities/connection.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Connection]),AuthModule],
  controllers: [ConnectionController],
  providers: [ConnectionService,JwtStrategy],
})
export class ConnectionModule {}
