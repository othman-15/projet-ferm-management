package ma.fpl.projetservice.Dtos;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import ma.fpl.projetservice.entities.Statusprojet;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class RequestProjetDTO {
    private String nom;
    private String description;
    private String typeCulture;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    @Enumerated(EnumType.STRING)
    private Statusprojet statusProjet;
}
