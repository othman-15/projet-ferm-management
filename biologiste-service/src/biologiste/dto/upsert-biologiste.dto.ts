// src/biologiste/dto/upsert-biologiste.dto.ts
import { IsString, IsUUID, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpsertBiologisteDto {
    @ApiProperty({
        description: 'UUID du compte Keycloak',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsUUID(4)
    @IsNotEmpty()
    keycloakUserId: string;

    @ApiProperty({
        description: 'Nom complet',
        example: 'Dr. Jean Martin',
        required: false
    })
    @IsOptional()
    @IsString()
    @Length(2, 100)
    nom?: string;  // ← Accepter null

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    specialite?: string;


    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    telephone?: string;

    @IsOptional()
    actif?: boolean;
}