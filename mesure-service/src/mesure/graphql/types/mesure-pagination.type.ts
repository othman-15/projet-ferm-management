import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MesureType } from './mesure.type';

/**
 * Type GraphQL pour la réponse paginée
 */
@ObjectType('MesurePagination')
export class MesurePaginationType {
    @Field(() => [MesureType], { description: 'Liste des mesures' })
    data: MesureType[];

    @Field(() => Int, { description: 'Nombre total de mesures' })
    total: number;

    @Field(() => Int, { description: 'Numéro de la page actuelle' })
    page: number;

    @Field(() => Int, { description: 'Nombre de résultats par page' })
    limit: number;

    @Field(() => Int, { description: 'Nombre total de pages' })
    totalPages: number;
}