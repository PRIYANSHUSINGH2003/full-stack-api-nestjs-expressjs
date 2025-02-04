import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a user
  async createUser(data: { name: string; email: string; password: string }) {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password, // Make sure to hash the password in a real-world scenario
      },
    });
  }

  // Get all users
  async getUsers() {
    return this.prisma.user.findMany();
  }

  // Update a user by ID
  async updateUser(id: string, data: { name?: string; email?: string; password?: string }) {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if the email is being updated and if it already exists
    if (data.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException(`Email ${data.email} is already taken`);
      }
    }

    // Update the user
    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  // Delete a user by ID
  async deleteUser(id: string) {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true, projects: true }, // Include tasks and projects to check for dependencies
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if the user has any tasks or projects assigned
    if (user.tasks.length > 0 || user.projects.length > 0) {
      throw new BadRequestException(`Cannot delete user with existing tasks or projects`);
    }

    // Delete the user
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
