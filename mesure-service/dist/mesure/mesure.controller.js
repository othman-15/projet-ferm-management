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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MesureController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
const mesure_service_1 = require("./mesure.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_mesure_dto_1 = require("./dto/create-mesure.dto");
const query_mesure_dto_1 = require("./dto/query-mesure.dto");
let MesureController = class MesureController {
    mesureService;
    constructor(mesureService) {
        this.mesureService = mesureService;
    }
    extractToken(headers) {
        const authHeader = headers.authorization || headers.Authorization;
        return authHeader?.replace('Bearer ', '') || '';
    }
    async create(createMesureDto, req, headers) {
        const token = this.extractToken(headers);
        return this.mesureService.create(createMesureDto, req.user, token);
    }
    async findAll(query, req, headers) {
        const token = this.extractToken(headers);
        return this.mesureService.findAll(query, req.user, token);
    }
    async findByProjet(projetId, req, headers) {
        const token = this.extractToken(headers);
        return this.mesureService.findByProjet(projetId, req.user, token);
    }
    async findOne(id, req, headers) {
        const token = this.extractToken(headers);
        return this.mesureService.findOne(id, req.user, token);
    }
    async remove(id) {
        await this.mesureService.remove(id);
        return { message: 'Mesure supprimée avec succès' };
    }
};
exports.MesureController = MesureController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'BIOLOGISTE'),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle mesure' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Mesure créée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides, capteur ou projet inexistant' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Accès refusé au projet' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mesure_dto_1.CreateMesureDto, Object, Object]),
    __metadata("design:returntype", Promise)
], MesureController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'BIOLOGISTE'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les mesures' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_mesure_dto_1.QueryMesureDto, Object, Object]),
    __metadata("design:returntype", Promise)
], MesureController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('projet/:projetId'),
    (0, roles_decorator_1.Roles)('ADMIN', 'BIOLOGISTE'),
    (0, swagger_1.ApiOperation)({ summary: "Récupérer les mesures d'un projet" }),
    __param(0, (0, common_1.Param)('projetId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MesureController.prototype, "findByProjet", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'BIOLOGISTE'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une mesure par ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MesureController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une mesure (ADMIN uniquement)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MesureController.prototype, "remove", null);
exports.MesureController = MesureController = __decorate([
    (0, swagger_1.ApiTags)('Mesures'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('mesures'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [mesure_service_1.MesureService])
], MesureController);
//# sourceMappingURL=mesure.controller.js.map