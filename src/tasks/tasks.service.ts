import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TaskStatus } from '@prisma/client'; // Importing TaskStatus enum from Prisma

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  // Valid task statuses
  private readonly validStatuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']; // Using TaskStatus enum

  // Create a task
  async createTask(data: { title: string; description: string; projectId: string; assignedUserId: string }) {
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        project: { connect: { id: data.projectId } },
        assignedUser: { connect: { id: data.assignedUserId } },
      },
    });
  }

  // Get tasks for a project
  async getTasks(projectId: string) {
    return this.prisma.task.findMany({
      where: { projectId },
    });
  }

  // Update task by ID
  async updateTask(id: string, data: { title?: string; description?: string; status?: TaskStatus }) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Validate the status if provided
    if (data.status && !this.validStatuses.includes(data.status)) {
      throw new BadRequestException(`Invalid status. Valid statuses are: ${this.validStatuses.join(', ')}`);
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        ...data,
        status: data.status || task.status, // Preserve the previous status if not updated
      },
    });
  }

  // Delete task by ID
  async deleteTask(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.task.delete({
      where: { id },
    });
  }
}
