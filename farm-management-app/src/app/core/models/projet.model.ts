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

export interface ResponseProjetDTO {
  idProjet: number;
  nom: string;
  description: string;
  typeCulture: string;
  dateDebut: string;
  dateFin: string;
  statusProjet: Statusprojet;
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
  nom: string;
  telephone: string;
  specialite: string;
  roleDansProjet: string;
  dateAffectation: string;
}

export interface ProjetDetailDTO {
  idProjet: number;
  nom: string;
  description: string;
  statut: Statusprojet;
  affectations: BiologisteAffecteDTO[];
}
