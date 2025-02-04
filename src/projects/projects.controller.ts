import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectStatus } from '@prisma/client'; // Importing ProjectStatus enum

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(@Body() body: { name: string; description: string; userId: string }) {
    return this.projectsService.createProject(body);
  }

  @Get()
  async getProjects() {
    return this.projectsService.getProjects();
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() body: { name: string; description: string; status?: ProjectStatus } // Use ProjectStatus enum
  ) {
    return this.projectsService.updateProject(id, body);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
