package ma.fpl.equipmentservice.dtos;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import ma.fpl.equipmentservice.entities.EquipmentStatus;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ResponseEquipmentDto {

    private Long id;
    private String nom;
    private String type;
    private String reference;


    private EquipmentStatus status;

    private Long projetId;


}
