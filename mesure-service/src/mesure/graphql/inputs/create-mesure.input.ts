import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsDateString, MaxLength, Min } from 'class-validator';
import { QualiteDonnee } from '../../enums/qualite-donnee.enum';

/**
 * Input GraphQL pour créer une mesure (équivalent du CreateMesureDto)
 */
@InputType('CreateMesureInput')
export class CreateMesureInput {
    @Field(() => Float, { description: 'Valeur numérique de la mesure' })
    @IsNotEmpty({ message: 'La valeur de la mesure est obligatoire' })
    @IsNumber({}, { message: 'La valeur doit être un nombre' })
    @Min(0, { message: 'La valeur doit être positive ou nulle' })
    valeur: number;

    @Field({ description: 'Unité de mesure' })
    @IsNotEmpty({ message: "L'unité de mesure est obligatoire" })
    @IsString()
    @MaxLength(20, { message: "L'unité ne peut pas dépasser 20 caractères" })
    unite: string;

    @Field({ description: 'Date et heure de la mesure (ISO 8601)' })
    @IsNotEmpty({ message: 'La date de mesure est obligatoire' })
    @IsDateString({}, { message: 'La date doit être au format ISO 8601' })
    dateMesure: string;

    @Field(() => QualiteDonnee, { description: 'Qualité de la donnée' })
    @IsNotEmpty({ message: 'La qualité de la donnée est obligatoire' })
    @IsEnum(QualiteDonnee, {
        message: 'La qualité doit être BONNE, MOYENNE ou MAUVAISE',
    })
    qualiteDonnee: QualiteDonnee;

    @Field({ description: 'Identifiant du capteur' })
    @IsNotEmpty({ message: "L'identifiant du capteur est obligatoire" })
    @IsString()
    capteurId: string;

    @Field({ description: 'Identifiant du projet' })
    @IsNotEmpty({ message: "L'identifiant du projet est obligatoire" })
    @IsString()
    projetId: string;
}