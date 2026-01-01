package ma.fpl.projetservice.Dtos;

import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class RequestAffectationDTO {
    private String biologisteId;
    private String roleDansProjet;

    private LocalDate dateAffectation;


}