package ma.fpl.equipmentservice.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String type;
    private String reference;

    @Enumerated(EnumType.STRING)
    private EquipmentStatus status;

    private Long projetId;

    @OneToMany(
            mappedBy = "equipment",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Capteur> capteurs = new ArrayList<>();
}
