import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';
import { QualiteDonnee } from '../../enums/qualite-donnee.enum';

// Enregistrer l'enum pour GraphQL
registerEnumType(QualiteDonnee, {
    name: 'QualiteDonnee',
    description: 'Qualité de la donnée mesurée',
});

/**
 * Type GraphQL pour Mesure
 */
@ObjectType('Mesure')
export class MesureType {
    @Field(() => ID, { description: 'Identifiant unique de la mesure' })
    id: string;

    @Field(() => Float, { description: 'Valeur numérique de la mesure' })
    valeur: number;

    @Field({ description: 'Unité de mesure' })
    unite: string;

    @Field({ description: 'Date et heure de la mesure' })
    dateMesure: Date;

    @Field(() => QualiteDonnee, { description: 'Qualité de la donnée' })
    qualiteDonnee: QualiteDonnee;

    @Field({ description: 'Identifiant du capteur' })
    capteurId: string;

    @Field({ description: 'Identifiant du projet' })
    projetId: string;

    // ✅ CORRIGER : Rendre nullable: true
    @Field({ description: 'Date de création', nullable: true })
    createdAt?: Date;

    // ✅ CORRIGER : Rendre nullable: true
    @Field({ description: 'Date de mise à jour', nullable: true })
    updatedAt?: Date;
}