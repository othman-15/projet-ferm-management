import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsEnum,
    IsUUID,
    IsDateString,
    MaxLength,
    Min,
} from 'class-validator';
import { QualiteDonnee } from '../enums/qualite-donnee.enum';

/**
 * DTO pour la création d'une mesure
 * Utilisé par : POST /mesures
 */
export class CreateMesureDto {
    @ApiProperty({
        description: 'Valeur numérique de la mesure',
        example: 23.5,
        minimum: 0,
    })
    @IsNotEmpty({ message: 'La valeur de la mesure est obligatoire' })
    @IsNumber({}, { message: 'La valeur doit être un nombre' })
    @Min(0, { message: 'La valeur doit être positive ou nulle' })
    valeur: number;

    @ApiProperty({
        description: 'Unité de mesure',
        example: '°C',
        maxLength: 20,
    })
    @IsNotEmpty({ message: "L'unité de mesure est obligatoire" })
    @IsString()
    @MaxLength(20, { message: "L'unité ne peut pas dépasser 20 caractères" })
    unite: string;

    @ApiProperty({
        description: 'Date et heure de la mesure (ISO 8601)',
        example: '2025-01-15T10:30:00Z',
        type: String,
    })
    @IsNotEmpty({ message: 'La date de mesure est obligatoire' })
    @IsDateString({}, { message: 'La date doit être au format ISO 8601' })
    dateMesure: string;

    @ApiProperty({
        description: 'Qualité de la donnée',
        enum: QualiteDonnee,
        default: QualiteDonnee.BONNE,
    })
    @IsNotEmpty({ message: 'La qualité de la donnée est obligatoire' })
    @IsEnum(QualiteDonnee, {
        message: 'La qualité doit être BONNE, MOYENNE ou MAUVAISE',
    })
    qualiteDonnee: QualiteDonnee;

    @ApiProperty({
        description: 'Identifiant UUID du capteur',
        example: '550e8400-e29b-41d4-a716-446655440001',
    })
    @IsNotEmpty({ message: "L'identifiant du capteur est obligatoire" })
    @IsUUID('4', { message: 'Identifiant du capteur invalide' })
    capteurId: string;

    @ApiProperty({
        description: 'Identifiant UUID du projet',
        example: '660e8400-e29b-41d4-a716-446655440002',
    })
    @IsNotEmpty({ message: "L'identifiant du projet est obligatoire" })
    @IsUUID('4', { message: 'Identifiant du projet invalide' })
    projetId: string;
}