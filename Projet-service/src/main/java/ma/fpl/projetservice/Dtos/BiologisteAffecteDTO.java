package ma.fpl.projetservice.Dtos;

import lombok.*;

import java.time.LocalDate;

public record BiologisteAffecteDTO(
        String biologisteId,
        String nom,
        String telephone,
        String specialite,
        String roleDansProjet,
        LocalDate dateAffectation
) {}