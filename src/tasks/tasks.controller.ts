import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from '@prisma/client'; // Importing TaskStatus enum

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() body: { title: string; description: string; projectId: string; assignedUserId: string }) {
    return this.tasksService.createTask(body);
  }

  @Get(':projectId')
  async getTasks(@Param('projectId') projectId: string) {
    return this.tasksService.getTasks(projectId);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string; status?: TaskStatus } // Use TaskStatus enum here
  ) {
    return this.tasksService.updateTask(id, body);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
