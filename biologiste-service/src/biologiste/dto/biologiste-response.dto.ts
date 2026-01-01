// src/biologiste/dto/biologiste-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {Biologiste} from "../entities/biologiste.entity";

export class BiologisteResponseDto {
    @ApiProperty({ description: 'ID technique' })
    id: number;

    @ApiProperty({ description: 'UUID Keycloak' })
    keycloakUserId: string;

    @ApiProperty({ description: 'Nom complet', nullable: true })
    nom: string ;

    @ApiProperty({
        description: 'Spécialité',
        required: false,
        nullable: true  // ← Ajouter cela
    })
    specialite?: string ;  // ← Changer à string | null

    @ApiProperty({
        description: 'Téléphone',
        required: false,
        nullable: true  // ← Ajouter cela
    })
    telephone?: string ;   // ← Changer à string | null

    @ApiProperty({ description: 'Statut actif' })
    actif: boolean;

    @ApiProperty({ description: 'Date de création' })
    dateCreation: Date;

    @ApiProperty({ description: 'Date de modification' })
    dateModification: Date;


    static fromEntity(b: Biologiste): BiologisteResponseDto {
        return {
            id: b.id,
            keycloakUserId: b.keycloakUserId,
            nom: b.nom,
            specialite: b.specialite,
            telephone: b.telephone,
            actif: b.actif,
            dateCreation: b.dateCreation,
            dateModification: b.dateModification,
        };
    }
}