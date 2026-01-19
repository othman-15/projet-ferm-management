import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { MesureService } from '../mesure.service';
import { MesureType } from './types/mesure.type';
import { MesurePaginationType } from './types/mesure-pagination.type';
import { CreateMesureInput } from './inputs/create-mesure.input';
import { QueryMesureInput } from './inputs/query-mesure.input';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { GqlRolesGuard } from '../../auth/guards/gql-roles.guard';
import { Roles } from '../../auth/roles.decorator';

/**
 * Resolver GraphQL pour les Mesures
 * Remplace le MesureController REST
 */
@Resolver(() => MesureType)
@UseGuards(GqlAuthGuard, GqlRolesGuard)
export class MesureResolver {
    constructor(private readonly mesureService: MesureService) {}

    /**
     * Mutation : Créer une nouvelle mesure
     * Équivalent de POST /mesures
     */
    @Mutation(() => MesureType, {
        name: 'createMesure',
        description: 'Créer une nouvelle mesure',
    })
    @Roles('ADMIN', 'BIOLOGISTE')
    async createMesure(
        @Args('input') input: CreateMesureInput,
        @Context() context,
    ): Promise<MesureType> {
        const user = context.req.user;
        const token = context.req.headers.authorization?.replace('Bearer ', '');

        return this.mesureService.create(input, user, token);
    }

    /**
     * Query : Récupérer toutes les mesures avec filtres et pagination
     * Équivalent de GET /mesures
     */
    @Query(() => MesurePaginationType, {
        name: 'mesures',
        description: 'Récupérer toutes les mesures avec pagination',
    })
    @Roles('ADMIN', 'BIOLOGISTE')
    async getMesures(
        @Args('filters', { nullable: true }) filters: QueryMesureInput,
        @Context() context,
    ): Promise<MesurePaginationType> {
        const user = context.req.user;
        const token = context.req.headers.authorization?.replace('Bearer ', '');

        return this.mesureService.findAll(filters || {}, user, token);
    }

    /**
     * Query : Récupérer les mesures d'un projet
     * Équivalent de GET /mesures/projet/:projetId
     */
    @Query(() => [MesureType], {
        name: 'mesuresByProjet',
        description: "Récupérer toutes les mesures d'un projet",
    })
    @Roles('ADMIN', 'BIOLOGISTE')
    async getMesuresByProjet(
        @Args('projetId') projetId: string,
        @Context() context,
    ): Promise<MesureType[]> {
        const user = context.req.user;
        const token = context.req.headers.authorization?.replace('Bearer ', '');

        return this.mesureService.findByProjet(projetId, user, token);
    }

    /**
     * Query : Récupérer une mesure par ID
     * Équivalent de GET /mesures/:id
     */
    @Query(() => MesureType, {
        name: 'mesure',
        description: 'Récupérer une mesure par son ID',
    })
    @Roles('ADMIN', 'BIOLOGISTE')
    async getMesure(
        @Args('id') id: string,
        @Context() context,
    ): Promise<MesureType> {
        const user = context.req.user;
        const token = context.req.headers.authorization?.replace('Bearer ', '');

        return this.mesureService.findOne(id, user, token);
    }

    /**
     * Mutation : Supprimer une mesure
     * Équivalent de DELETE /mesures/:id
     */
    @Mutation(() => Boolean, {
        name: 'deleteMesure',
        description: 'Supprimer une mesure (ADMIN uniquement)',
    })
    @Roles('ADMIN')
    async deleteMesure(@Args('id') id: string): Promise<boolean> {
        await this.mesureService.remove(id);
        return true;
    }
}