/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionController } from './connection.controller';
import { Connection } from 'src/schemas/connection.schema';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionSchema } from 'src/schemas/connection.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name: Connection.name,schema: ConnectionSchema },
      { name: User.name, schema: UserSchema},
    ]),
    UserModule,
    AuthModule
  ],
    
  controllers: [ConnectionController],
  providers: [AuthService,ConnectionService,JwtStrategy],
  exports:[ConnectionService]
})
export class ConnectionModule {}
