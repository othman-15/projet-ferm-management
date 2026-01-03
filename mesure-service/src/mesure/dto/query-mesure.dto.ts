import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsDateString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { QualiteDonnee } from '../enums/qualite-donnee.enum';

/**
 * DTO pour les requêtes de filtrage des mesures
 * Utilisé par : GET /mesures
 */
export class QueryMesureDto {
    @ApiPropertyOptional({
        description: 'Filtrer par projet',
        example: '660e8400-e29b-41d4-a716-446655440002',
    })
    @IsOptional()
    @IsUUID('4')
    projetId?: string;

    @ApiPropertyOptional({
        description: 'Filtrer par capteur',
        example: '550e8400-e29b-41d4-a716-446655440001',
    })
    @IsOptional()
    @IsUUID('4')
    capteurId?: string;

    @ApiPropertyOptional({
        description: 'Date de début (ISO 8601)',
        example: '2025-01-01T00:00:00Z',
    })
    @IsOptional()
    @IsDateString()
    dateDebut?: string;

    @ApiPropertyOptional({
        description: 'Date de fin (ISO 8601)',
        example: '2025-01-31T23:59:59Z',
    })
    @IsOptional()
    @IsDateString()
    dateFin?: string;

    @ApiPropertyOptional({
        description: 'Filtrer par qualité',
        enum: QualiteDonnee,
    })
    @IsOptional()
    @IsEnum(QualiteDonnee)
    qualiteDonnee?: QualiteDonnee;

    @ApiPropertyOptional({
        description: 'Nombre de résultats par page',
        example: 20,
        default: 20,
    })
    @IsOptional()
    @Type(() => Number)
    limit?: number = 20;

    @ApiPropertyOptional({
        description: 'Numéro de page',
        example: 1,
        default: 1,
    })
    @IsOptional()
    @Type(() => Number)
    page?: number = 1;
}