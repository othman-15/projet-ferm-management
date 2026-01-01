package ma.fpl.projetservice.Mappers;

import ma.fpl.projetservice.Dtos.AffectationBiologisteDTO;
import ma.fpl.projetservice.Dtos.ProjetDetailDTO;
import ma.fpl.projetservice.Dtos.RequestProjetDTO;
import ma.fpl.projetservice.Dtos.ResponseProjetDTO;
import ma.fpl.projetservice.entities.Projet;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class ProjetMapper {

    public Projet DTO_to_Projet(RequestProjetDTO dto) {
        Projet projet = new Projet();
        BeanUtils.copyProperties(dto, projet);
        return projet;
    }

    public ResponseProjetDTO Projet_To_DTO(Projet projet) {
        ResponseProjetDTO dto = new ResponseProjetDTO();
        BeanUtils.copyProperties(projet, dto);
        return dto;
    }
}
