package ma.fpl.projetservice.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AffectationBiologiste {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAffectation;

    private String biologisteId;

    private LocalDate dateAffectation;

    private String roleDansProjet;

    @ManyToOne
    @JoinColumn(name = "projet_id")
    private Projet projet;
}