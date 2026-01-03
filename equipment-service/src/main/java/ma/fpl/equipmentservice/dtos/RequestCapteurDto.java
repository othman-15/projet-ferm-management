package ma.fpl.equipmentservice.dtos;

import jakarta.persistence.*;
import lombok.*;
import ma.fpl.equipmentservice.entities.CapteurStatus;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class RequestCapteurDto {


    private String nom;
    private String type;
    private String unite;

    private CapteurStatus status;


}
