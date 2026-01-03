package ma.fpl.equipmentservice.mapper;

import ma.fpl.equipmentservice.dtos.RequestEquipmentDto;
import ma.fpl.equipmentservice.dtos.ResponseEquipmentDto;
import ma.fpl.equipmentservice.entities.Capteur;
import ma.fpl.equipmentservice.entities.Equipment;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class EquipmentMapper {
    public Equipment DTO_to_Equipement(RequestEquipmentDto dto) {
        Equipment equipment = new Equipment();
        BeanUtils.copyProperties(dto, equipment);
        return equipment;
    }
    public ResponseEquipmentDto equipementToDTO(Equipment equipment) {
        ResponseEquipmentDto responseEquipmentDto = new ResponseEquipmentDto();
        BeanUtils.copyProperties(equipment, responseEquipmentDto);
        return responseEquipmentDto;

    }
}
