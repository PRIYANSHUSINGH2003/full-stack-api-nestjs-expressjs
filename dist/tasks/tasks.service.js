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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
        this.validStatuses = ['TODO', 'IN_PROGRESS', 'DONE'];
    }
    createTask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.task.create({
                data: {
                    title: data.title,
                    description: data.description,
                    project: { connect: { id: data.projectId } },
                    assignedUser: { connect: { id: data.assignedUserId } },
                },
            });
        });
    }
    getTasks(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.task.findMany({
                where: { projectId },
            });
        });
    }
    updateTask(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.prisma.task.findUnique({ where: { id } });
            if (!task) {
                throw new common_1.NotFoundException(`Task with ID ${id} not found`);
            }
            if (data.status && !this.validStatuses.includes(data.status)) {
                throw new common_1.BadRequestException(`Invalid status. Valid statuses are: ${this.validStatuses.join(', ')}`);
            }
            return this.prisma.task.update({
                where: { id },
                data: Object.assign(Object.assign({}, data), { status: data.status || task.status }),
            });
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.prisma.task.findUnique({ where: { id } });
            if (!task) {
                throw new common_1.NotFoundException(`Task with ID ${id} not found`);
            }
            return this.prisma.task.delete({
                where: { id },
            });
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map