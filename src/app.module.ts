/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConnectionModule } from './connection/connection.module';
import { AuthModule } from './auth/auth.module';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.gaurd';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/questNest'),
    MongooseModule.forFeature([{name:'User',schema:UserSchema}]),
    MongooseModule.forFeatureAsync([
      {
        name:User.name,
        useFactory: () => {
          const Schema = UserSchema;
          Schema.pre('save',function() {
            console.log('hie');
          });
          return Schema;
        },
      },
    ]),
    /*ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),*/
    UserModule,
    ConnectionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,{provide:APP_GUARD,useClass:AuthGuard}],
})
export class AppModule { }
