import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: { name: string; email: string; password: string }) {
    return this.usersService.createUser(body);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: { name: string; email: string }) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
