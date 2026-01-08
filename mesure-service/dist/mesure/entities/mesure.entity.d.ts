import { Document } from 'mongoose';
import { QualiteDonnee } from '../enums/qualite-donnee.enum';
export type MesureDocument = Mesure & Document;
export declare class Mesure {
    id: string;
    valeur: number;
    unite: string;
    dateMesure: Date;
    qualiteDonnee: QualiteDonnee;
    capteurId: string;
    projetId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const MesureSchema: import("mongoose").Schema<Mesure, import("mongoose").Model<Mesure, any, any, any, Document<unknown, any, Mesure, any, import("mongoose").DefaultSchemaOptions> & Mesure & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, Mesure>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Mesure, Document<unknown, {}, Mesure, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Mesure & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, Mesure, Document<unknown, {}, Mesure, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Mesure & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    valeur?: import("mongoose").SchemaDefinitionProperty<number, Mesure, Document<unknown, {}, Mesure, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Mesure & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    unite?: import("mongoose").SchemaDefinitionProperty<string, Mesure, Document<unknown, {}, Mesure, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Mesure & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    dateMesure?: import("mongoose").SchemaDefinitionProperty<Date, Mesure, Document<unknown, {}, Mesure, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Mesure & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    qualiteDonnee?: import("mongoose").SchemaDefinitionProperty<QualiteDonnee, Mesure, Document<unknown, {}, Mesure, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Mesure & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    capteurId?: import("mongoose").SchemaDefinitionProperty<string, Mesure, Document<unknown, {}, Mesure, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Mesure & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    projetId?: import("mongoose").SchemaDefinitionProperty<string, Mesure, Document<unknown, {}, Mesure, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Mesure & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Mesure, Document<unknown, {}, Mesure, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Mesure & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Mesure, Document<unknown, {}, Mesure, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Mesure & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, Mesure>;
