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
exports.MesureSchema = exports.Mesure = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
const qualite_donnee_enum_1 = require("../enums/qualite-donnee.enum");
let Mesure = class Mesure {
    id;
    valeur;
    unite;
    dateMesure;
    qualiteDonnee;
    capteurId;
    projetId;
    createdAt;
    updatedAt;
};
exports.Mesure = Mesure;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
        default: () => (0, uuid_1.v4)(),
    }),
    __metadata("design:type", String)
], Mesure.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Mesure.prototype, "valeur", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, maxlength: 20 }),
    __metadata("design:type", String)
], Mesure.prototype, "unite", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true, index: true }),
    __metadata("design:type", Date)
], Mesure.prototype, "dateMesure", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: qualite_donnee_enum_1.QualiteDonnee,
        required: true,
        default: qualite_donnee_enum_1.QualiteDonnee.BONNE,
    }),
    __metadata("design:type", String)
], Mesure.prototype, "qualiteDonnee", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, index: true }),
    __metadata("design:type", String)
], Mesure.prototype, "capteurId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, index: true }),
    __metadata("design:type", String)
], Mesure.prototype, "projetId", void 0);
exports.Mesure = Mesure = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Mesure);
exports.MesureSchema = mongoose_1.SchemaFactory.createForClass(Mesure);
exports.MesureSchema.index({ projetId: 1, dateMesure: -1 });
exports.MesureSchema.index({ capteurId: 1, dateMesure: -1 });
//# sourceMappingURL=mesure.entity.js.map