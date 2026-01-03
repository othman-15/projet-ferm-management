package ma.fpl.equipmentservice.repository;

import ma.fpl.equipmentservice.entities.Capteur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CapteurRepository extends JpaRepository<Capteur, Long> {
    List<Capteur> findByEquipmentId(Long equipmentId);
}
