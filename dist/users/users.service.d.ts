import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
    }>;
    getUsers(): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
    }[]>;
    updateUser(id: string, data: {
        name?: string;
        email?: string;
        password?: string;
    }): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
    }>;
    deleteUser(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
    }>;
}
