// src/biologiste/biologiste.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Biologiste } from './entities/biologiste.entity';
import { UpsertBiologisteDto } from './dto/upsert-biologiste.dto';

@Injectable()
export class BiologisteService {
  private readonly logger = new Logger(BiologisteService.name);

  constructor(
      @InjectRepository(Biologiste)
      private readonly biologisteRepo: Repository<Biologiste>,
  ) {}

  async upsert(dto: UpsertBiologisteDto): Promise<Biologiste> {
    // Recherche par keycloakUserId (pas par id)
    let biologiste = await this.biologisteRepo.findOne({
      where: { keycloakUserId: dto.keycloakUserId },
    });

    if (biologiste) {
      // ✅ UPDATE
      this.logger.log(`Mise à jour biologiste ID ${biologiste.id}`);

      if (dto.nom !== undefined) biologiste.nom = dto.nom;
      if (dto.specialite !== undefined) biologiste.specialite = dto.specialite ?? null;
      if (dto.telephone !== undefined) biologiste.telephone = dto.telephone ?? null;
      if (dto.actif !== undefined) biologiste.actif = dto.actif;

    } else {
      // ✅ INSERT (ID auto-généré)
      this.logger.log(`Création biologiste Keycloak: ${dto.keycloakUserId}`);

      if (!dto.nom) {
        throw new BadRequestException('Nom obligatoire à la création');
      }

      // Utiliser l'opérateur de non-null assertion (après la vérification)
      biologiste = Biologiste.creerDepuisKeycloak(
          dto.keycloakUserId,
          dto.nom!,  // Le ! indique à TypeScript que ce n'est pas null/undefined
          dto.specialite ,
          dto.telephone ,
      );
    }

    return this.biologisteRepo.save(biologiste);
  }

  // 🎯 Vérifier existence par Keycloak UUID
  async existeParKeycloakId(keycloakUserId: string): Promise<boolean> {
    return this.biologisteRepo.existsBy({ keycloakUserId });
  }

  // 🎯 Récupérer par ID numérique
  async findById(id: number): Promise<Biologiste> {
    const biologiste = await this.biologisteRepo.findOne({
      where: { id },
    });

    if (!biologiste) {
      throw new NotFoundException(`Biologiste ${id} non trouvé`);
    }

    return biologiste;
  }

  // 🎯 Récupérer par Keycloak UUID
  async findByKeycloakId(keycloakUserId: string): Promise<Biologiste> {
    const biologiste = await this.biologisteRepo.findOne({
      where: { keycloakUserId },
    });

    if (!biologiste) {
      throw new NotFoundException(
          `Biologiste Keycloak ${keycloakUserId} non trouvé`,
      );
    }

    return biologiste;
  }

  // 🎯 Liste actifs
  async findAllActifs(): Promise<Biologiste[]> {
    return this.biologisteRepo.find({
      where: { actif: true },
      order: { dateCreation: 'DESC' },
    });
  }

  // 🎯 Recherche batch par Keycloak UUIDs
  async findByKeycloakIds(keycloakUserIds: string[]): Promise<Biologiste[]> {
    if (keycloakUserIds.length === 0) return [];

    return this.biologisteRepo
        .createQueryBuilder('biologiste')
        .where('biologiste.keycloakUserId IN (:...ids)', { ids: keycloakUserIds })
        .getMany();
  }
}