/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
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
  create(@Req() req:Request, @Body() createConnectionDto: CreateConnectionDto) {
    const authHeader=req.headers['authorization'];
    const token=authHeader.split(' ')[1];
    return this.connectionService.createConnection(createConnectionDto,token);

  }
  @Get('byUser/:userId')
  async getConnectionsByUser(@Req() req:Request ,@Param('userId') userId: number): Promise<any> {
    const authHeader=req.headers['authorization'];
    const token=authHeader.split(' ')[1];
    return this.connectionService.getConnectionsByUser(userId,token);
  }
  @Get()
  findAll() {
    return this.connectionService.findAllConnection();
  }
  @Get(':user_id')
  findOne( @Req() req:Request, @Param('user_id') id: string) {
    const authHeader=req.headers['authorization'];
    const token=authHeader.split(' ')[1];
    return this.connectionService.viewConnection(+id,token);
  }
  @Patch(':user_id')
  update( @Req() req:Request,@Param('user_id') id: string, @Body() updateConnectionDto: UpdateConnectionDto) {
    const authHeader=req.headers['authorization'];
    const token=authHeader.split(' ')[1];
    return this.connectionService.updateConnection(+id, updateConnectionDto,token);
  }
  @Delete(':user_id')
  remove( @Req() req:Request,@Param('user_id') id: string): Promise<{ affected?: number; }> {
    const authHeader=req.headers['authorization'];
    const token=authHeader.split(' ')[1];
    return this.connectionService.removeConnection(+id,token);
  }
}
