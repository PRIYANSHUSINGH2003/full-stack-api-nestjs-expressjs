"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                },
            });
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findMany();
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            if (data.email) {
                const existingUser = yield this.prisma.user.findUnique({
                    where: { email: data.email },
                });
                if (existingUser && existingUser.id !== id) {
                    throw new common_1.BadRequestException(`Email ${data.email} is already taken`);
                }
            }
            return this.prisma.user.update({
                where: { id },
                data: Object.assign({}, data),
            });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: { id },
                include: { tasks: true, projects: true },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            if (user.tasks.length > 0 || user.projects.length > 0) {
                throw new common_1.BadRequestException(`Cannot delete user with existing tasks or projects`);
            }
            return this.prisma.user.delete({
                where: { id },
            });
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map