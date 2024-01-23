/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ConnectionModule } from './connection/connection.module';
import { Connection } from './connection/entities/connection.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'sandhya@1234',
      username: 'postgres',
      entities: [User,Connection],
      database: 'Hotel',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    ConnectionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
