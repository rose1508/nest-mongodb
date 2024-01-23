/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Post()
  create(@Body() createConnectionDto: CreateConnectionDto) {
    return this.connectionService.createConnection(createConnectionDto);
  }

  @Get()
  findAll() {
    return this.connectionService.findAllConnection();
  }

  @Get(':user_id')
  findOne(@Param('user_id') id: string) {
    return this.connectionService.viewConnection(+id);
  }

  @Patch(':user_id')
  update(@Param('user_id') id: string, @Body() updateConnectionDto: UpdateConnectionDto) {
    return this.connectionService.updateConnection(+id, updateConnectionDto);
  }

  @Delete(':user_id')
  remove(@Param('user_id') id: string) {
    return this.connectionService.removeConnection(+id);
  }
}
