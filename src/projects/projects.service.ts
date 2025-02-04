import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectStatus } from '@prisma/client'; // Importing ProjectStatus enum from Prisma

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a project
  async createProject(data: { name: string; description: string; userId: string }) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        user: { connect: { id: data.userId } },
      },
    });
  }

  // Get all projects
  async getProjects() {
    return this.prisma.project.findMany();
  }

  // Update a project by ID
  async updateProject(id: string, data: { name?: string; description?: string; status?: ProjectStatus }) {
    // Check if the project exists
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Update project
    return this.prisma.project.update({
      where: { id },
      data: {
        ...data,
        
      },
    });
  }

  // Delete a project by ID
  async deleteProject(id: string) {
    // Check if the project exists
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { tasks: true }, // Include tasks to check for dependencies
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Check if there are tasks associated with the project
    if (project.tasks.length > 0) {
      throw new BadRequestException(`Cannot delete project with existing tasks`);
    }

    // Delete the project
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
