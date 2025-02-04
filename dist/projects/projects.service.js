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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createProject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.project.create({
                data: {
                    name: data.name,
                    description: data.description,
                    user: { connect: { id: data.userId } },
                },
            });
        });
    }
    getProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.project.findMany();
        });
    }
    updateProject(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.prisma.project.findUnique({
                where: { id },
            });
            if (!project) {
                throw new common_1.NotFoundException(`Project with ID ${id} not found`);
            }
            return this.prisma.project.update({
                where: { id },
                data: Object.assign({}, data),
            });
        });
    }
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.prisma.project.findUnique({
                where: { id },
                include: { tasks: true },
            });
            if (!project) {
                throw new common_1.NotFoundException(`Project with ID ${id} not found`);
            }
            if (project.tasks.length > 0) {
                throw new common_1.BadRequestException(`Cannot delete project with existing tasks`);
            }
            return this.prisma.project.delete({
                where: { id },
            });
        });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map