package ma.fpl.equipmentservice.mapper;

import ma.fpl.equipmentservice.dtos.RequestCapteurDto;
import ma.fpl.equipmentservice.dtos.ResponseCapteurDto;
import ma.fpl.equipmentservice.entities.Capteur;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class CapteurMapper {

    public Capteur DTO_to_capteur(RequestCapteurDto dto) {
        Capteur capteur = new Capteur();
        BeanUtils.copyProperties(dto, capteur);
        return capteur;
    }
    public ResponseCapteurDto capteurToDTO(Capteur capteur) {
        ResponseCapteurDto dto = new ResponseCapteurDto();
        BeanUtils.copyProperties(capteur, dto);
        return dto;
    }
}
