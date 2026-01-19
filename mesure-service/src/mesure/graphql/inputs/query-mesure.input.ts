import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsDateString, IsEnum } from 'class-validator';
import { QualiteDonnee } from '../../enums/qualite-donnee.enum';

/**
 * Input GraphQL pour filtrer les mesures (équivalent du QueryMesureDto)
 */
@InputType('QueryMesureInput')
export class QueryMesureInput {
    @Field({ nullable: true, description: 'Filtrer par projet' })
    @IsOptional()
    projetId?: string;

    @Field({ nullable: true, description: 'Filtrer par capteur' })
    @IsOptional()
    capteurId?: string;

    @Field({ nullable: true, description: 'Date de début (ISO 8601)' })
    @IsOptional()
    @IsDateString()
    dateDebut?: string;

    @Field({ nullable: true, description: 'Date de fin (ISO 8601)' })
    @IsOptional()
    @IsDateString()
    dateFin?: string;

    @Field(() => QualiteDonnee, { nullable: true, description: 'Filtrer par qualité' })
    @IsOptional()
    @IsEnum(QualiteDonnee)
    qualiteDonnee?: QualiteDonnee;

    @Field(() => Int, { nullable: true, defaultValue: 20, description: 'Nombre de résultats par page' })
    @IsOptional()
    limit?: number;

    @Field(() => Int, { nullable: true, defaultValue: 1, description: 'Numéro de page' })
    @IsOptional()
    page?: number;
}