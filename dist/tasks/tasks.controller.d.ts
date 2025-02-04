import { TasksService } from './tasks.service';
import { TaskStatus } from '@prisma/client';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    createTask(body: {
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
    updateTask(id: string, body: {
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
