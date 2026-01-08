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
exports.CreateMesureDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const qualite_donnee_enum_1 = require("../enums/qualite-donnee.enum");
class CreateMesureDto {
    valeur;
    unite;
    dateMesure;
    qualiteDonnee;
    capteurId;
    projetId;
}
exports.CreateMesureDto = CreateMesureDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valeur numérique de la mesure',
        example: 23.5,
        minimum: 0,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La valeur de la mesure est obligatoire' }),
    (0, class_validator_1.IsNumber)({}, { message: 'La valeur doit être un nombre' }),
    (0, class_validator_1.Min)(0, { message: 'La valeur doit être positive ou nulle' }),
    __metadata("design:type", Number)
], CreateMesureDto.prototype, "valeur", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unité de mesure',
        example: '°C',
        maxLength: 20,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "L'unité de mesure est obligatoire" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20, { message: "L'unité ne peut pas dépasser 20 caractères" }),
    __metadata("design:type", String)
], CreateMesureDto.prototype, "unite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date et heure de la mesure (ISO 8601)',
        example: '2025-01-15T10:30:00Z',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La date de mesure est obligatoire' }),
    (0, class_validator_1.IsDateString)({}, { message: 'La date doit être au format ISO 8601' }),
    __metadata("design:type", String)
], CreateMesureDto.prototype, "dateMesure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Qualité de la donnée',
        enum: qualite_donnee_enum_1.QualiteDonnee,
        default: qualite_donnee_enum_1.QualiteDonnee.BONNE,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La qualité de la donnée est obligatoire' }),
    (0, class_validator_1.IsEnum)(qualite_donnee_enum_1.QualiteDonnee, {
        message: 'La qualité doit être BONNE, MOYENNE ou MAUVAISE',
    }),
    __metadata("design:type", String)
], CreateMesureDto.prototype, "qualiteDonnee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifiant du capteur (numérique ou UUID)',
        example: '1',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "L'identifiant du capteur est obligatoire" }),
    (0, class_validator_1.IsString)({ message: "L'identifiant du capteur doit être une chaîne de caractères" }),
    __metadata("design:type", String)
], CreateMesureDto.prototype, "capteurId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifiant du projet (numérique ou UUID)',
        example: '1',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "L'identifiant du projet est obligatoire" }),
    (0, class_validator_1.IsString)({ message: "L'identifiant du projet doit être une chaîne de caractères" }),
    __metadata("design:type", String)
], CreateMesureDto.prototype, "projetId", void 0);
//# sourceMappingURL=create-mesure.dto.js.map