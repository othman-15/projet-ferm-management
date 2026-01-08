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

    // ✅ MODIFIÉ : Accepte des IDs numériques (ex: "1", "2", "123")
    @ApiProperty({
        description: 'Identifiant du capteur (numérique ou UUID)',
        example: '1',
        type: String,
    })
    @IsNotEmpty({ message: "L'identifiant du capteur est obligatoire" })
    @IsString({ message: "L'identifiant du capteur doit être une chaîne de caractères" })
    capteurId: string;

    // ✅ MODIFIÉ : Accepte des IDs numériques (ex: "1", "2", "123")
    @ApiProperty({
        description: 'Identifiant du projet (numérique ou UUID)',
        example: '1',
        type: String,
    })
    @IsNotEmpty({ message: "L'identifiant du projet est obligatoire" })
    @IsString({ message: "L'identifiant du projet doit être une chaîne de caractères" })
    projetId: string;
}