import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { QualiteDonnee } from '../enums/qualite-donnee.enum';

export type MesureDocument = Mesure & Document;

/**
 * Schema Mongoose pour les Mesures
 * Représente une mesure capteur stockée dans MongoDB
 */
@Schema({ timestamps: true })
export class Mesure {
    /**
     * Identifiant métier UUID (exposé en API au lieu de _id MongoDB)
     */
    @Prop({
        type: String,
        required: true,
        unique: true,
        default: () => uuidv4(),
    })
    id: string;

    /**
     * Valeur numérique de la mesure
     */
    @Prop({ type: Number, required: true })
    valeur: number;

    /**
     * Unité de mesure (°C, %, pH, lux, mg/L...)
     */
    @Prop({ type: String, required: true, maxlength: 20 })
    unite: string;

    /**
     * Date et heure de la mesure
     */
    @Prop({ type: Date, required: true, index: true })
    dateMesure: Date;

    /**
     * Qualité de la donnée mesurée
     */
    @Prop({
        type: String,
        enum: QualiteDonnee,
        required: true,
        default: QualiteDonnee.BONNE,
    })
    qualiteDonnee: QualiteDonnee;

    /**
     * Identifiant du capteur source (référence externe)
     */
    @Prop({ type: String, required: true, index: true })
    capteurId: string;

    /**
     * Identifiant du projet associé (référence externe)
     * Utilisé pour les contrôles d'accès BIOLOGISTE
     */
    @Prop({ type: String, required: true, index: true })
    projetId: string;

    // Timestamps automatiques (createdAt, updatedAt)
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Factory du schéma Mongoose
 */
export const MesureSchema = SchemaFactory.createForClass(Mesure);

/**
 * Index composites pour optimiser les requêtes
 */
// Requêtes par projet + tri par date
MesureSchema.index({ projetId: 1, dateMesure: -1 });

// Requêtes par capteur + tri par date
MesureSchema.index({ capteurId: 1, dateMesure: -1 });