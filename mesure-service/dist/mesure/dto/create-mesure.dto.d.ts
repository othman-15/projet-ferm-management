import { QualiteDonnee } from '../enums/qualite-donnee.enum';
export declare class CreateMesureDto {
    valeur: number;
    unite: string;
    dateMesure: string;
    qualiteDonnee: QualiteDonnee;
    capteurId: string;
    projetId: string;
}
