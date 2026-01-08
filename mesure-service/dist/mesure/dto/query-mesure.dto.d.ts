import { QualiteDonnee } from '../enums/qualite-donnee.enum';
export declare class QueryMesureDto {
    projetId?: string;
    capteurId?: string;
    dateDebut?: string;
    dateFin?: string;
    qualiteDonnee?: QualiteDonnee;
    limit?: number;
    page?: number;
}
