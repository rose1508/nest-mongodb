/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';
import { AuthGuard } from 'src/auth/auth.gaurd';
@Controller('connection')
export class ConnectionController {
  @UseGuards(AuthGuard)
  @Get('protected')
  protectedEndpoint(): string {
    return 'This is a protected endpoint';
  }
  @Get('another-protected-route')
  anotherProtectedEndpoint(): string {
    return 'This is another protected endpoint';
  }
  constructor(private readonly connectionService: ConnectionService) { }
  @Post()
  create(@Body() createConnectionDto: CreateConnectionDto) {
    return this.connectionService.createConnection(createConnectionDto);
  }
  @Get('byUser/:userId')
  async getConnectionsByUser(@Param('userId') userId: number): Promise<any> {
    return this.connectionService.getConnectionsByUser(userId);
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
  remove(@Param('user_id') id: string): Promise<{ affected?: number; }> {
    return this.connectionService.removeConnection(+id);
  }
}
