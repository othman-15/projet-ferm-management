package ma.fpl.projetservice.Dtos;

import lombok.*;
import ma.fpl.projetservice.entities.Statusprojet;

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
    private Statusprojet statut;
    private List<BiologisteAffecteDTO> affectations;
}
