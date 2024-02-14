/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConnectionDto } from './dto/create-Connection.dto';
import { UpdateConnectionDto } from './dto/update-Connection.dto';
import { Connection } from './entities/connection.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(Connection) private readonly connectionRepository: Repository<Connection>,
    private readonly jwtStrategy:JwtStrategy
  ) {}
  async getConnectionsByUser(userId: number): Promise<Connection[]> {
    return this.connectionRepository.find();
  }
  createConnection(createConnectionDto: CreateConnectionDto,token:string):Promise<Connection> {
if (this.jwtStrategy.validate(token))
    {
      const connection:Connection = new Connection();
    connection.user_id= createConnectionDto.user_id;
    connection.connection_user_id = createConnectionDto.connection_user_id;
    connection.username = createConnectionDto.username;
    connection.connection_status = createConnectionDto.connection_status;
    return this.connectionRepository.save(connection);
    }
  }
  findAllConnection() : Promise<Connection[]> {
    return this.connectionRepository.find();
  }
viewConnection (user_id:number):Promise<Connection>{
  return this.connectionRepository.findOneBy({user_id});
}
updateConnection(user_id: number,updateConnectionDto:UpdateConnectionDto) : Promise<Connection>{
  const connection:Connection = new Connection();
  connection.user_id=user_id;
  connection.connection_user_id=updateConnectionDto.connection_user_id;
  connection.connection_status=updateConnectionDto.connection_status;
  return this.connectionRepository.save(connection);
}
removeConnection(user_id:number):Promise<{affected? : number}> {
  return this.connectionRepository.delete(user_id);
}
}