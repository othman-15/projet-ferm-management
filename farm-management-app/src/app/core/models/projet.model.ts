// ============================================
// ENUMS
// ============================================

export enum Statusprojet {
  EN_COURS = 'EN_COURS',
  TERMINE = 'TERMINE',
  EN_ATTENTE = 'EN_ATTENTE',
  PLANIFIE = 'PLANIFIE'
}

// ============================================
// BIOLOGISTE DTOs (NestJS)
// ============================================

export interface BiologisteResponseDto {
  id: number;
  keycloakUserId: string;
  nom: string;
  specialite?: string | null;
  telephone?: string | null;
  actif: boolean;
  dateCreation: Date | string;
  dateModification: Date | string;
}

export interface UpsertBiologisteDto {
  keycloakUserId: string;
  nom?: string;
  specialite?: string;
  telephone?: string;
  actif?: boolean;
}

// ============================================
// PROJET DTOs (Spring Boot)
// ============================================

export interface RequestProjetDTO {
  nom: string;
  description: string;
  typeCulture: string;
  dateDebut: string; // LocalDate -> string (ISO format)
  dateFin: string;
  statusProjet: Statusprojet;
}

export interface ProjetDetailDTO {
  idProjet: number;
  nom: string;
  description: string;
  typeCulture?: string | null;    // ← Ajoutez ? et | null
  dateDebut?: string | null;      // ← Ajoutez ? et | null
  dateFin?: string | null;        // ← Ajoutez ? et | null
  statut: Statusprojet;
  affectations: BiologisteAffecteDTO[];
}

// ============================================
// AFFECTATION DTOs
// ============================================

export interface RequestAffectationDTO {
  biologisteId: string;
  roleDansProjet: string;
  dateAffectation: string; // LocalDate -> string (ISO format)
}

export interface ResponseAffectationDTO {
  idAffectation: number;
  biologisteId: string;
  roleDansProjet: string;
  dateAffectation: string;
}

// ============================================
// PROJET DETAIL DTOs
// ============================================

export interface BiologisteAffecteDTO {
  biologisteId: string;
  nom: string;               // ← Assurez-vous que c'est bien là
  telephone?: string;        // ← Optionnel
  specialite?: string;       // ← Optionnel
  roleDansProjet: string;
  dateAffectation: string;
}
export interface ResponseProjetDTO {
  idProjet: number;
  nom: string;
  description: string;
  typeCulture: string;
  dateDebut: string;
  dateFin: string;
  statut: Statusprojet;
}
// export interface ProjetDetailDTO {
//   idProjet: number;
//   nom: string;
//   description: string;
//   statut: Statusprojet;
//   affectations: BiologisteAffecteDTO[];
// }
export enum TypeEquipment {
  TRACTEUR = 'TRACTEUR',
  IRRIGATION = 'IRRIGATION',
  SERRE = 'SERRE',
  STOCKAGE = 'STOCKAGE',
  AUTRE = 'AUTRE'
}

export enum TypeCapteur {
  TEMPERATURE = 'TEMPERATURE',
  HUMIDITE = 'HUMIDITE',
  PH = 'PH',
  LUMINOSITE = 'LUMINOSITE',
  PRESSION = 'PRESSION',
  AUTRE = 'AUTRE'
}

export interface RequestEquipmentDto {
  nom: string;
  type: TypeEquipment;
  description?: string;
  projetId: number;
  dateInstallation: string;
}

export interface ResponseEquipmentDto {
  id: number;
  nom: string;
  type: TypeEquipment;
  description?: string;
  projetId: number;
  dateInstallation: string;
  nombreCapteurs?: number;
}

export interface RequestCapteurDto {
  nom: string;
  type: TypeCapteur;
  unite: string;
  description?: string;
}

export interface ResponseCapteurDto {
  id: number;
  nom: string;
  type: TypeCapteur;
  unite: string;
  description?: string;
  equipmentId: number;
  dateInstallation: string;
  actif: boolean;
}
// ============================================
// MESURE DTOs & TYPES (NestJS GraphQL)
// ============================================

export enum QualiteDonnee {
  BONNE = 'BONNE',
  MOYENNE = 'MOYENNE',
  MAUVAISE = 'MAUVAISE'
}

export interface CreateMesureInput {
  valeur: number;
  unite: string;
  dateMesure: string; // ISO 8601
  qualiteDonnee: QualiteDonnee;
  capteurId: string;
  projetId: string;
}

export interface QueryMesureInput {
  projetId?: string;
  capteurId?: string;
  dateDebut?: string;
  dateFin?: string;
  qualiteDonnee?: QualiteDonnee;
  limit?: number;
  page?: number;
}

export interface Mesure {
  id: string;
  valeur: number;
  unite: string;
  dateMesure: string;
  qualiteDonnee: QualiteDonnee;
  capteurId: string;
  projetId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MesurePagination {
  data: Mesure[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MesureStatistics {
  total: number;
  parQualite: {
    bonne: number;
    moyenne: number;
    mauvaise: number;
  };
  pourcentages: {
    bonne: number;
    moyenne: number;
    mauvaise: number;
  };
}
