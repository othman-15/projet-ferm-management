package ma.fpl.projetservice.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Projet {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long idProjet;
     private String nom;
     private String description;
     private String typeCulture;
     private LocalDate dateDebut;
     private LocalDate dateFin;
     @Enumerated(EnumType.STRING)
     private Statusprojet statusProjet;
     @OneToMany(
             mappedBy = "projet",
             cascade = CascadeType.ALL,
             orphanRemoval = true,
             fetch = FetchType.LAZY
     )
     private List<AffectationBiologiste> affectations = new ArrayList<>();

}
