package ma.fpl.equipmentservice.dtos;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import ma.fpl.equipmentservice.entities.CapteurStatus;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ResponseCapteurDto {

    private Long id;
    private String nom;
    private String type;
    private String unite;

    private CapteurStatus status;


}
