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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryMesureDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const qualite_donnee_enum_1 = require("../enums/qualite-donnee.enum");
class QueryMesureDto {
    projetId;
    capteurId;
    dateDebut;
    dateFin;
    qualiteDonnee;
    limit = 20;
    page = 1;
}
exports.QueryMesureDto = QueryMesureDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filtrer par projet',
        example: '660e8400-e29b-41d4-a716-446655440002',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], QueryMesureDto.prototype, "projetId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filtrer par capteur',
        example: '550e8400-e29b-41d4-a716-446655440001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], QueryMesureDto.prototype, "capteurId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Date de début (ISO 8601)',
        example: '2025-01-01T00:00:00Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QueryMesureDto.prototype, "dateDebut", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Date de fin (ISO 8601)',
        example: '2025-01-31T23:59:59Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QueryMesureDto.prototype, "dateFin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filtrer par qualité',
        enum: qualite_donnee_enum_1.QualiteDonnee,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(qualite_donnee_enum_1.QualiteDonnee),
    __metadata("design:type", String)
], QueryMesureDto.prototype, "qualiteDonnee", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nombre de résultats par page',
        example: 20,
        default: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryMesureDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Numéro de page',
        example: 1,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryMesureDto.prototype, "page", void 0);
//# sourceMappingURL=query-mesure.dto.js.map