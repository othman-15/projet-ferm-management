import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
    Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mesure, MesureDocument } from './entities/mesure.entity';
import { CreateMesureDto } from './dto/create-mesure.dto';
import { QueryMesureDto } from './dto/query-mesure.dto';
import {EquipmentClient} from "../clients/equipment.client";
import {ProjetClient} from "../clients/projet.client";


@Injectable()
export class MesureService {
    private readonly logger = new Logger(MesureService.name);

    constructor(
        @InjectModel(Mesure.name)
        private mesureModel: Model<MesureDocument>,
        private readonly equipmentClient: EquipmentClient,
        private readonly projetClient: ProjetClient, // ✅ AJOUTER
    ) {}

    /**
     * Créer une nouvelle mesure
     * Accessible par : ADMIN, BIOLOGISTE
     *
     * Règles métier :
     * 1. La date de mesure ne peut pas être dans le futur
     * 2. Le projet doit exister
     * 3. Le capteur doit exister
     * 4. Si BIOLOGISTE : il doit avoir accès au projet
     */
    async create(
        createMesureDto: CreateMesureDto,
        user: any,
        token: string,
    ): Promise<MesureDocument> {
        this.logger.log(
            `Création d'une mesure par ${user.username} (${user.roles.join(', ')})`,
        );

        // ========== VALIDATION 1 : Date de mesure ==========
        const dateMesure = new Date(createMesureDto.dateMesure);
        const maintenant = new Date();

        if (dateMesure > maintenant) {
            throw new BadRequestException(
                'La date de mesure ne peut pas être dans le futur',
            );
        }

        // Vérifier que la date n'est pas trop ancienne (ex: plus de 1 an)
        const unAnAvant = new Date();
        unAnAvant.setFullYear(unAnAvant.getFullYear() - 1);

        if (dateMesure < unAnAvant) {
            this.logger.warn(
                `Date de mesure très ancienne : ${dateMesure.toISOString()}`,
            );
        }

        // ========== VALIDATION 2 : Vérifier que le PROJET existe ========== ✅ NOUVEAU
        try {
            const projetExists = await this.projetClient.verifyProjetExists(
                createMesureDto.projetId,
                token,
            );

            if (!projetExists) {
                throw new BadRequestException(
                    `Le projet avec l'ID ${createMesureDto.projetId} n'existe pas`,
                );
            }
        } catch (error) {
            this.logger.error(
                `Erreur lors de la vérification du projet: ${error.message}`,
            );
            throw error;
        }

        // ========== VALIDATION 3 : Vérifier que le CAPTEUR existe ==========
        try {
            const capteurExists = await this.equipmentClient.verifyCapteurExists(
                createMesureDto.capteurId,
                token,
            );

            if (!capteurExists) {
                throw new BadRequestException(
                    `Le capteur avec l'ID ${createMesureDto.capteurId} n'existe pas`,
                );
            }
        } catch (error) {
            this.logger.error(
                `Erreur lors de la vérification du capteur: ${error.message}`,
            );
            throw error;
        }

        // ========== VALIDATION 4 : Contrôle d'accès BIOLOGISTE ========== ✅ AMÉLIORÉ
        if (
            user.roles.includes('BIOLOGISTE') &&
            !user.roles.includes('ADMIN')
        ) {
            // Vérifier que le biologiste a accès au projet
            const hasAccess = await this.projetClient.verifyBiologisteAccess(
                user.userId,
                createMesureDto.projetId,
                token,
            );

            if (!hasAccess) {
                throw new ForbiddenException(
                    `Vous n'avez pas accès au projet ${createMesureDto.projetId}`,
                );
            }

            this.logger.log(
                `✅ Biologiste ${user.username} a bien accès au projet ${createMesureDto.projetId}`,
            );
        }

        // ========== CRÉATION DE LA MESURE ==========
        const mesure = new this.mesureModel({
            ...createMesureDto,
            dateMesure,
        });

        const saved = await mesure.save();

        this.logger.log(
            `✅ Mesure créée avec succès : ${saved.id} (valeur: ${saved.valeur} ${saved.unite})`,
        );

        return saved;
    }

    // ... (garder les autres méthodes identiques : findAll, findByProjet, findOne, remove, getStatistics)

    // ✅ AMÉLIORATION des autres méthodes avec vérification d'accès biologiste

    async findAll(
        query: QueryMesureDto,
        user: any,
        token: string, // ✅ AJOUTER le token
    ): Promise<{
        data: MesureDocument[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        this.logger.log(
            `Recherche de mesures par ${user.username} avec filtres: ${JSON.stringify(query)}`,
        );

        const filter: any = {};

        // ========== FILTRE PAR RÔLE ==========
        if (
            user.roles.includes('BIOLOGISTE') &&
            !user.roles.includes('ADMIN')
        ) {
            if (!query.projetId) {
                throw new ForbiddenException(
                    'Les biologistes doivent spécifier un projetId dans les filtres',
                );
            }

            // ✅ VÉRIFIER l'accès au projet
            const hasAccess = await this.projetClient.verifyBiologisteAccess(
                user.userId,
                query.projetId,
                token,
            );

            if (!hasAccess) {
                throw new ForbiddenException(
                    `Vous n'avez pas accès au projet ${query.projetId}`,
                );
            }

            filter.projetId = query.projetId;
        } else {
            if (query.projetId) {
                filter.projetId = query.projetId;
            }
        }

        // ========== AUTRES FILTRES ==========
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

        // ========== PAGINATION ==========
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

        this.logger.log(
            `✅ ${data.length} mesures trouvées (page ${page}/${totalPages}, total: ${total})`,
        );

        return {
            data,
            total,
            page,
            limit,
            totalPages,
        };
    }

    async findByProjet(
        projetId: string,
        user: any,
        token: string, // ✅ AJOUTER
    ): Promise<MesureDocument[]> {
        this.logger.log(
            `Recherche des mesures du projet ${projetId} par ${user.username}`,
        );

        // ========== CONTRÔLE D'ACCÈS BIOLOGISTE ==========
        if (
            user.roles.includes('BIOLOGISTE') &&
            !user.roles.includes('ADMIN')
        ) {
            const hasAccess = await this.projetClient.verifyBiologisteAccess(
                user.userId,
                projetId,
                token,
            );

            if (!hasAccess) {
                throw new ForbiddenException(
                    `Vous n'avez pas accès au projet ${projetId}`,
                );
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

    async findOne(id: string, user: any, token: string): Promise<MesureDocument> {
        this.logger.log(`Recherche de la mesure ${id} par ${user.username}`);

        const mesure = await this.mesureModel.findOne({ id }).lean().exec();

        if (!mesure) {
            throw new NotFoundException(`Mesure avec l'ID ${id} introuvable`);
        }

        // ========== CONTRÔLE D'ACCÈS BIOLOGISTE ==========
        if (
            user.roles.includes('BIOLOGISTE') &&
            !user.roles.includes('ADMIN')
        ) {
            const hasAccess = await this.projetClient.verifyBiologisteAccess(
                user.userId,
                mesure.projetId,
                token,
            );

            if (!hasAccess) {
                throw new ForbiddenException('Accès refusé à cette mesure');
            }
        }

        this.logger.log(`✅ Mesure ${id} trouvée`);

        return mesure;
    }

    async remove(id: string): Promise<void> {
        this.logger.log(`Suppression de la mesure ${id}`);

        const result = await this.mesureModel.deleteOne({ id }).exec();

        if (result.deletedCount === 0) {
            throw new NotFoundException(`Mesure avec l'ID ${id} introuvable`);
        }

        this.logger.log(`✅ Mesure ${id} supprimée avec succès`);
    }

    async getStatistics(projetId?: string): Promise<any> {
        const filter = projetId ? { projetId } : {};

        const [total, bonneQualite, moyenneQualite, mauvaiseQualite] =
            await Promise.all([
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
}