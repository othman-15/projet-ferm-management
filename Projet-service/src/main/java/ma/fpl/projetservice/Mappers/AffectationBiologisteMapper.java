package ma.fpl.projetservice.Mappers;

import ma.fpl.projetservice.Dtos.RequestAffectationDTO;
import ma.fpl.projetservice.Dtos.ResponseAffectationDTO;
import ma.fpl.projetservice.entities.AffectationBiologiste;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class AffectationBiologisteMapper {

    public AffectationBiologiste DTO_to_Entity(RequestAffectationDTO dto) {
        AffectationBiologiste affectation = new AffectationBiologiste();
        BeanUtils.copyProperties(dto, affectation);

        // valeur métier définie ici (pas dans le contrôleur)
        affectation.setDateAffectation(LocalDate.now());

        return affectation;
    }

    public ResponseAffectationDTO Entity_to_DTO(AffectationBiologiste affectation) {
        ResponseAffectationDTO dto = new ResponseAffectationDTO();
        BeanUtils.copyProperties(affectation, dto);
        return dto;
    }
}
