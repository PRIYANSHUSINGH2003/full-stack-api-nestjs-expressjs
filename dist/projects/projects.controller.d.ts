import { ProjectsService } from './projects.service';
import { ProjectStatus } from '@prisma/client';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    createProject(body: {
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
    updateProject(id: string, body: {
        name: string;
        description: string;
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
