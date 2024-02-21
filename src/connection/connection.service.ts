/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateConnectionDto } from './dto/create-Connection.dto';
import { UpdateConnectionDto } from './dto/update-Connection.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'src/schemas/connection.schema';
@Injectable()
export class ConnectionService {
  constructor(
    @InjectModel('Connection') private connectionModel: Model<Connection>,
    private readonly jwtStrategy: JwtStrategy
  ) { }

  async getConnectionsByUser(userId: number, token: string): Promise<Connection[]> {
    if (this.jwtStrategy.validate(token))
      return this.connectionModel.find();
  }
  async createConnection(createConnectionDto: CreateConnectionDto, token: string): Promise<Connection> {
    if (this.jwtStrategy.validate(token)) {
      const connection = await new this.connectionModel(createConnectionDto);
      return connection.save();
    }
  }
  findAllConnection(): Promise<Connection[]> {
    return this.connectionModel.find();
  }
  viewConnection(user_id: number, token: string): Promise<Connection> {
    if (this.jwtStrategy.validate(token))
      return this.connectionModel.findById(user_id);
  }
  async updateConnection(user_id: number, updateConnectionDto: UpdateConnectionDto, token: string): Promise<Connection> {
    if (this.jwtStrategy.validate(token)) {
      const connection = await this.connectionModel.findByIdAndUpdate(user_id, updateConnectionDto, { new: true });
      return connection;
    }
  }
  removeConnection(user_id: number, token: string): Promise<{ affected?: number }> {
    if (this.jwtStrategy.validate(token)) {
      return this.connectionModel.findByIdAndDelete(user_id);

    }
    console.log("sandhya", user_id)
  }
}
