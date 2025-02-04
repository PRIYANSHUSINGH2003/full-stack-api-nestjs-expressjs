import { PrismaService } from '../prisma.service';
import { TaskStatus } from '@prisma/client';
export declare class TasksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly validStatuses;
    createTask(data: {
        title: string;
        description: string;
        projectId: string;
        assignedUserId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.TaskStatus;
        title: string;
        projectId: string;
        assignedUserId: string | null;
    }>;
    getTasks(projectId: string): Promise<{
        id: string;
        createdAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.TaskStatus;
        title: string;
        projectId: string;
        assignedUserId: string | null;
    }[]>;
    updateTask(id: string, data: {
        title?: string;
        description?: string;
        status?: TaskStatus;
    }): Promise<{
        id: string;
        createdAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.TaskStatus;
        title: string;
        projectId: string;
        assignedUserId: string | null;
    }>;
    deleteTask(id: string): Promise<{
        id: string;
        createdAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.TaskStatus;
        title: string;
        projectId: string;
        assignedUserId: string | null;
    }>;
}
