package ma.fpl.equipmentservice.service;

import ma.fpl.equipmentservice.dtos.RequestCapteurDto;
import ma.fpl.equipmentservice.dtos.RequestEquipmentDto;
import ma.fpl.equipmentservice.dtos.ResponseCapteurDto;
import ma.fpl.equipmentservice.dtos.ResponseEquipmentDto;

import java.util.List;

public interface EquipmentService {
    void deleteEquipment(Long equipmentId);
    void removeCapteur(Long equipmentId, Long capteurId);
    ResponseEquipmentDto createEquipment(RequestEquipmentDto dto);
    List<ResponseEquipmentDto> getAllEquipments();
    ResponseEquipmentDto getEquipmentById(Long id);
    List<ResponseEquipmentDto> getEquipmentsByProjetId(Long projetId);

    ResponseCapteurDto addCapteurToEquipment(Long equipmentId, RequestCapteurDto dto);
    List<ResponseCapteurDto> getCapteursByEquipment(Long equipmentId);
    ResponseCapteurDto getCapteurById(Long capteurId);
}
