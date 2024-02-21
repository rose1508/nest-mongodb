/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { Connection } from 'mongoose';
import { ConnectionSchema } from 'src/schemas/connection.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{
    name: User.name, schema: UserSchema},
    { name: Connection.name, schema: ConnectionSchema},
  ]),
],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
