package ma.fpl.projetservice.Dtos;

import lombok.*;
import ma.fpl.projetservice.entities.Statusprojet;

import java.time.LocalDate;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ProjetDetailDTO {
    private Long idProjet;
    private String nom;
    private String description;
    private String typeCulture;
    private Statusprojet statut;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private List<BiologisteAffecteDTO> affectations;
}
