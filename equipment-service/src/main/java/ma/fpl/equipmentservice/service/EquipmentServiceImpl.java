package ma.fpl.equipmentservice.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import ma.fpl.equipmentservice.client.ProjetClient;
import ma.fpl.equipmentservice.dtos.RequestCapteurDto;
import ma.fpl.equipmentservice.dtos.RequestEquipmentDto;
import ma.fpl.equipmentservice.dtos.ResponseCapteurDto;
import ma.fpl.equipmentservice.dtos.ResponseEquipmentDto;
import ma.fpl.equipmentservice.entities.Capteur;
import ma.fpl.equipmentservice.entities.Equipment;
import ma.fpl.equipmentservice.mapper.CapteurMapper;
import ma.fpl.equipmentservice.mapper.EquipmentMapper;
import ma.fpl.equipmentservice.repository.CapteurRepository;
import ma.fpl.equipmentservice.repository.EquipmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class EquipmentServiceImpl implements EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final CapteurRepository capteurRepository;
    private final EquipmentMapper equipmentMapper;
    private final CapteurMapper capteurMapper;
    private final ProjetClient projetClient;

    @Override
    public ResponseEquipmentDto createEquipment(RequestEquipmentDto dto) {

        try {
            projetClient.existsById(dto.getProjetId());
        } catch (Exception e) {
            throw new IllegalStateException(
                    "Projet inexistant ou accès refusé : " + dto.getProjetId()
            );
        }

        Equipment equipment = equipmentMapper.DTO_to_Equipement(dto);
        Equipment saved = equipmentRepository.save(equipment);
        return equipmentMapper.equipementToDTO(saved);
    }

    @Override
    public ResponseCapteurDto getCapteurById(Long capteurId) {
        Capteur capteur = capteurRepository.findById(capteurId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Capteur non trouvé : " + capteurId)
                );
        return capteurMapper.capteurToDTO(capteur);
    }
    @Override
    public List<ResponseEquipmentDto> getAllEquipments() {
        return equipmentRepository.findAll()
                .stream()
                .map(equipmentMapper::equipementToDTO)
                .toList();
    }

    @Override
    public ResponseEquipmentDto getEquipmentById(Long id) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Equipment not found with id " + id)
                );
        return equipmentMapper.equipementToDTO(equipment);
    }

    @Override
    public List<ResponseEquipmentDto> getEquipmentsByProjetId(Long projetId) {
        return equipmentRepository.findByProjetId(projetId)
                .stream()
                .map(equipmentMapper::equipementToDTO)
                .toList();
    }


    @Override
    public ResponseCapteurDto addCapteurToEquipment(
            Long equipmentId,
            RequestCapteurDto dto
    ) {
        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() ->
                        new RuntimeException("Equipment not found with id " + equipmentId)
                );

        Capteur capteur = capteurMapper.DTO_to_capteur(dto);
        capteur.setEquipment(equipment);

        Capteur saved = capteurRepository.save(capteur);
        return capteurMapper.capteurToDTO(saved);
    }

    @Override
    public List<ResponseCapteurDto> getCapteursByEquipment(Long equipmentId) {

        return capteurRepository.findByEquipmentId(equipmentId)
                .stream()
                .map(capteurMapper::capteurToDTO)
                .toList();
    }





    @Override
    public void deleteEquipment(Long equipmentId) {
        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Equipment non trouvé : " + equipmentId)
                );
        equipmentRepository.delete(equipment);
    }




    @Override
    public void removeCapteur(Long equipmentId, Long capteurId) {

        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Equipment non trouvé : " + equipmentId)
                );

        Capteur capteur = capteurRepository.findById(capteurId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Capteur non trouvé : " + capteurId)
                );

        if (!capteur.getEquipment().getId().equals(equipmentId)) {
            throw new IllegalStateException("Ce capteur n'appartient pas à cet equipment");
        }

        equipment.getCapteurs().remove(capteur);
        capteurRepository.delete(capteur);
    }
}