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
var MesureService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MesureService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mesure_entity_1 = require("./entities/mesure.entity");
const equipment_client_1 = require("../clients/equipment.client");
const projet_client_1 = require("../clients/projet.client");
let MesureService = MesureService_1 = class MesureService {
    mesureModel;
    equipmentClient;
    projetClient;
    logger = new common_1.Logger(MesureService_1.name);
    constructor(mesureModel, equipmentClient, projetClient) {
        this.mesureModel = mesureModel;
        this.equipmentClient = equipmentClient;
        this.projetClient = projetClient;
    }
    async create(createMesureDto, user, token) {
        this.logger.log(`Création d'une mesure par ${user.username} (${user.roles.join(', ')})`);
        const dateMesure = new Date(createMesureDto.dateMesure);
        const maintenant = new Date();
        if (dateMesure > maintenant) {
            throw new common_1.BadRequestException('La date de mesure ne peut pas être dans le futur');
        }
        const unAnAvant = new Date();
        unAnAvant.setFullYear(unAnAvant.getFullYear() - 1);
        if (dateMesure < unAnAvant) {
            this.logger.warn(`Date de mesure très ancienne : ${dateMesure.toISOString()}`);
        }
        try {
            const projetExists = await this.projetClient.verifyProjetExists(createMesureDto.projetId, token);
            if (!projetExists) {
                throw new common_1.BadRequestException(`Le projet avec l'ID ${createMesureDto.projetId} n'existe pas`);
            }
        }
        catch (error) {
            this.logger.error(`Erreur lors de la vérification du projet: ${error.message}`);
            throw error;
        }
        try {
            const capteurExists = await this.equipmentClient.verifyCapteurExists(createMesureDto.capteurId, token);
            if (!capteurExists) {
                throw new common_1.BadRequestException(`Le capteur avec l'ID ${createMesureDto.capteurId} n'existe pas`);
            }
        }
        catch (error) {
            this.logger.error(`Erreur lors de la vérification du capteur: ${error.message}`);
            throw error;
        }
        if (user.roles.includes('BIOLOGISTE') &&
            !user.roles.includes('ADMIN')) {
            const hasAccess = await this.projetClient.verifyBiologisteAccess(user.userId, createMesureDto.projetId, token);
            if (!hasAccess) {
                throw new common_1.ForbiddenException(`Vous n'avez pas accès au projet ${createMesureDto.projetId}`);
            }
            this.logger.log(`✅ Biologiste ${user.username} a bien accès au projet ${createMesureDto.projetId}`);
        }
        const mesure = new this.mesureModel({
            ...createMesureDto,
            dateMesure,
        });
        const saved = await mesure.save();
        this.logger.log(`✅ Mesure créée avec succès : ${saved.id} (valeur: ${saved.valeur} ${saved.unite})`);
        return saved;
    }
    async findAll(query, user, token) {
        this.logger.log(`Recherche de mesures par ${user.username} avec filtres: ${JSON.stringify(query)}`);
        const filter = {};
        if (user.roles.includes('BIOLOGISTE') &&
            !user.roles.includes('ADMIN')) {
            if (!query.projetId) {
                throw new common_1.ForbiddenException('Les biologistes doivent spécifier un projetId dans les filtres');
            }
            const hasAccess = await this.projetClient.verifyBiologisteAccess(user.userId, query.projetId, token);
            if (!hasAccess) {
                throw new common_1.ForbiddenException(`Vous n'avez pas accès au projet ${query.projetId}`);
            }
            filter.projetId = query.projetId;
        }
        else {
            if (query.projetId) {
                filter.projetId = query.projetId;
            }
        }
        if (query.capteurId) {
            filter.capteurId = query.capteurId;
        }
        if (query.qualiteDonnee) {
            filter.qualiteDonnee = query.qualiteDonnee;
        }
        if (query.dateDebut || query.dateFin) {
            filter.dateMesure = {};
            if (query.dateDebut) {
                filter.dateMesure.$gte = new Date(query.dateDebut);
            }
            if (query.dateFin) {
                filter.dateMesure.$lte = new Date(query.dateFin);
            }
        }
        const limit = Math.min(query.limit || 20, 100);
        const page = Math.max(query.page || 1, 1);
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.mesureModel
                .find(filter)
                .sort({ dateMesure: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.mesureModel.countDocuments(filter).exec(),
        ]);
        const totalPages = Math.ceil(total / limit);
        this.logger.log(`✅ ${data.length} mesures trouvées (page ${page}/${totalPages}, total: ${total})`);
        return {
            data,
            total,
            page,
            limit,
            totalPages,
        };
    }
    async findByProjet(projetId, user, token) {
        this.logger.log(`Recherche des mesures du projet ${projetId} par ${user.username}`);
        if (user.roles.includes('BIOLOGISTE') &&
            !user.roles.includes('ADMIN')) {
            const hasAccess = await this.projetClient.verifyBiologisteAccess(user.userId, projetId, token);
            if (!hasAccess) {
                throw new common_1.ForbiddenException(`Vous n'avez pas accès au projet ${projetId}`);
            }
        }
        const mesures = await this.mesureModel
            .find({ projetId })
            .sort({ dateMesure: -1 })
            .lean()
            .exec();
        this.logger.log(`✅ ${mesures.length} mesures trouvées pour le projet ${projetId}`);
        return mesures;
    }
    async findOne(id, user, token) {
        this.logger.log(`Recherche de la mesure ${id} par ${user.username}`);
        const mesure = await this.mesureModel.findOne({ id }).lean().exec();
        if (!mesure) {
            throw new common_1.NotFoundException(`Mesure avec l'ID ${id} introuvable`);
        }
        if (user.roles.includes('BIOLOGISTE') &&
            !user.roles.includes('ADMIN')) {
            const hasAccess = await this.projetClient.verifyBiologisteAccess(user.userId, mesure.projetId, token);
            if (!hasAccess) {
                throw new common_1.ForbiddenException('Accès refusé à cette mesure');
            }
        }
        this.logger.log(`✅ Mesure ${id} trouvée`);
        return mesure;
    }
    async remove(id) {
        this.logger.log(`Suppression de la mesure ${id}`);
        const result = await this.mesureModel.deleteOne({ id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Mesure avec l'ID ${id} introuvable`);
        }
        this.logger.log(`✅ Mesure ${id} supprimée avec succès`);
    }
    async getStatistics(projetId) {
        const filter = projetId ? { projetId } : {};
        const [total, bonneQualite, moyenneQualite, mauvaiseQualite] = await Promise.all([
            this.mesureModel.countDocuments(filter),
            this.mesureModel.countDocuments({ ...filter, qualiteDonnee: 'BONNE' }),
            this.mesureModel.countDocuments({
                ...filter,
                qualiteDonnee: 'MOYENNE',
            }),
            this.mesureModel.countDocuments({
                ...filter,
                qualiteDonnee: 'MAUVAISE',
            }),
        ]);
        return {
            total,
            parQualite: {
                bonne: bonneQualite,
                moyenne: moyenneQualite,
                mauvaise: mauvaiseQualite,
            },
            pourcentages: {
                bonne: total > 0 ? Math.round((bonneQualite / total) * 100) : 0,
                moyenne: total > 0 ? Math.round((moyenneQualite / total) * 100) : 0,
                mauvaise: total > 0 ? Math.round((mauvaiseQualite / total) * 100) : 0,
            },
        };
    }
};
exports.MesureService = MesureService;
exports.MesureService = MesureService = MesureService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(mesure_entity_1.Mesure.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        equipment_client_1.EquipmentClient,
        projet_client_1.ProjetClient])
], MesureService);
//# sourceMappingURL=mesure.service.js.map