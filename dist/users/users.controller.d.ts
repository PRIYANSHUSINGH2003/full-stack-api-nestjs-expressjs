import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(body: {
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
    updateUser(id: string, body: {
        name: string;
        email: string;
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
