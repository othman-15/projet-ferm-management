import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mesure, MesureDocument } from './entities/mesure.entity';
import { CreateMesureDto } from './dto/create-mesure.dto';
import { QueryMesureDto } from './dto/query-mesure.dto';

/**
 * Service de gestion des mesures
 * Contient toute la logique métier
 */
@Injectable()
export class MesureService {
    constructor(
        @InjectModel(Mesure.name)
        private mesureModel: Model<MesureDocument>,
    ) {}

    /**
     * Créer une nouvelle mesure
     * Accessible par : ADMIN, BIOLOGISTE
     */
    async create(
        createMesureDto: CreateMesureDto,
        user: any,
    ): Promise<MesureDocument> {
        // Validation : date de mesure ne peut pas être dans le futur
        const dateMesure = new Date(createMesureDto.dateMesure);
        const maintenant = new Date();

        if (dateMesure > maintenant) {
            throw new BadRequestException(
                'La date de mesure ne peut pas être dans le futur',
            );
        }

        // Si BIOLOGISTE : vérifier qu'il a accès au projet
        // (Pour l'instant on fait confiance, mais tu peux appeler le microservice Projet)
        if (
            user.roles.includes('BIOLOGISTE') &&
            !user.roles.includes('ADMIN')
        ) {
            // TODO: Appeler le microservice Projet pour vérifier l'accès
            // const hasAccess = await this.verifierAccesProjet(user.userId, createMesureDto.projetId);
            // if (!hasAccess) throw new ForbiddenException('Accès au projet refusé');
        }

        const mesure = new this.mesureModel({
            ...createMesureDto,
            dateMesure,
        });

        return mesure.save();
    }

    /**
     * Récupérer toutes les mesures avec filtres
     * ADMIN : toutes les mesures
     * BIOLOGISTE : uniquement ses projets
     */
    async findAll(
        query: QueryMesureDto,
        user: any,
    ): Promise<{ data: MesureDocument[]; total: number; page: number; limit: number }> {
        const filter: any = {};

        // Si BIOLOGISTE : filtrer par ses projets uniquement
        if (
            user.roles.includes('BIOLOGISTE') &&
            !user.roles.includes('ADMIN')
        ) {
            // TODO: Récupérer la liste des projets du biologiste depuis le microservice Projet
            // const projetIds = await this.getProjetsDuBiologiste(user.userId);
            // filter.projetId = { $in: projetIds };

            // Pour l'instant, on force le filtre par projetId si fourni
            if (!query.projetId) {
                throw new ForbiddenException(
                    'Les biologistes doivent spécifier un projetId',
                );
            }
            filter.projetId = query.projetId;
        }

        // Appliquer les filtres de la query
        if (query.projetId) {
            filter.projetId = query.projetId;
        }

        if (query.capteurId) {
            filter.capteurId = query.capteurId;
        }

        if (query.qualiteDonnee) {
            filter.qualiteDonnee = query.qualiteDonnee;
        }

        // Filtres par date
        if (query.dateDebut || query.dateFin) {
            filter.dateMesure = {};
            if (query.dateDebut) {
                filter.dateMesure.$gte = new Date(query.dateDebut);
            }
            if (query.dateFin) {
                filter.dateMesure.$lte = new Date(query.dateFin);
            }
        }

        // Pagination
        const limit = query.limit || 20;
        const page = query.page || 1;
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.mesureModel
                .find(filter)
                .sort({ dateMesure: -1 }) // Tri par date décroissante
                .skip(skip)
                .limit(limit)
                .exec(),
            this.mesureModel.countDocuments(filter),
        ]);

        return {
            data,
            total,
            page,
            limit,
        };
    }

    /**
     * Récupérer toutes les mesures d'un projet
     * ADMIN : toujours autorisé
     * BIOLOGISTE : seulement si le projet lui est affecté
     */
    async findByProjet(
        projetId: string,
        user: any,
    ): Promise<MesureDocument[]> {
        // Si BIOLOGISTE : vérifier l'accès au projet
        if (
            user.roles.includes('BIOLOGISTE') &&
            !user.roles.includes('ADMIN')
        ) {
            // TODO: Vérifier que le biologiste a accès à ce projet
            // const hasAccess = await this.verifierAccesProjet(user.userId, projetId);
            // if (!hasAccess) throw new ForbiddenException('Accès au projet refusé');
        }

        return this.mesureModel
            .find({ projetId })
            .sort({ dateMesure: -1 })
            .exec();
    }

    /**
     * Récupérer une mesure par ID
     */
    async findOne(id: string, user: any): Promise<MesureDocument> {
        const mesure = await this.mesureModel.findOne({ id }).exec();

        if (!mesure) {
            throw new NotFoundException(`Mesure avec l'ID ${id} introuvable`);
        }

        // Si BIOLOGISTE : vérifier l'accès au projet
        if (
            user.roles.includes('BIOLOGISTE') &&
            !user.roles.includes('ADMIN')
        ) {
            // TODO: Vérifier l'accès au projet
            // const hasAccess = await this.verifierAccesProjet(user.userId, mesure.projetId);
            // if (!hasAccess) throw new ForbiddenException('Accès refusé');
        }

        return mesure;
    }

    /**
     * Supprimer une mesure
     * Accessible uniquement par ADMIN
     */
    async remove(id: string): Promise<void> {
        const result = await this.mesureModel.deleteOne({ id }).exec();

        if (result.deletedCount === 0) {
            throw new NotFoundException(`Mesure avec l'ID ${id} introuvable`);
        }
    }

    /**
     * Méthode helper : Vérifier l'accès d'un biologiste à un projet
     * TODO: Appeler le microservice Projet via HTTP
     */
    // private async verifierAccesProjet(
    //   userId: string,
    //   projetId: string,
    // ): Promise<boolean> {
    //   // Appel HTTP au microservice Projet
    //   // GET http://projet-service:3001/projets/{projetId}/biologistes/{userId}
    //   return true; // À implémenter
    // }
}