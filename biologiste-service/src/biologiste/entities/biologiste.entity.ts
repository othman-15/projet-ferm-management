// src/biologiste/entities/biologiste.entity.ts
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';

// src/biologiste/entities/biologiste.entity.ts
@Entity('biologistes')
export class Biologiste {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid', unique: true, nullable: false })
    @Index()
    keycloakUserId: string;

    @Column({ type: 'varchar', length: 100 })
    nom: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    specialite?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telephone?: string;

    @Column({ default: true })
    actif: boolean;

    @CreateDateColumn()
    dateCreation: Date;

    @UpdateDateColumn()
    dateModification: Date;

    // 🎯 Factory Method (DDD)
    static creerDepuisKeycloak(
        keycloakId: string,
        nom: string,
        specialite?: string,
        telephone?: string
    ): Biologiste {
        const biologiste = new Biologiste();
        biologiste.keycloakUserId = keycloakId;
        biologiste.nom = nom;
        biologiste.actif = true;

        if (specialite !== undefined) {
            biologiste.specialite = specialite;
        }

        if (telephone !== undefined) {
            biologiste.telephone = telephone;
        }

        return biologiste;
    }
}
