/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConnectionModule } from './connection/connection.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'sandhya@1234',
      username: 'postgres',
      database: 'Hotel',
      synchronize: true,
      logging: true,
      entities: ["dist/**/*.entity.js"],
      migrations: ["src/migrations/*.ts"], 
    }),
    UserModule,
    ConnectionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,JwtAuthGuard],
})
export class AppModule {}
