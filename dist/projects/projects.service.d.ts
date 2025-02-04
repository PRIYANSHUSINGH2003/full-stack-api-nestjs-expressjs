import { PrismaService } from '../prisma.service';
import { ProjectStatus } from '@prisma/client';
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createProject(data: {
        name: string;
        description: string;
        userId: string;
    }): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        userId: string;
    }>;
    getProjects(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        userId: string;
    }[]>;
    updateProject(id: string, data: {
        name?: string;
        description?: string;
        status?: ProjectStatus;
    }): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        userId: string;
    }>;
    deleteProject(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        userId: string;
    }>;
}
