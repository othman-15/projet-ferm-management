package ma.fpl.equipmentservice.repository;

import ma.fpl.equipmentservice.entities.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment,Long> {
    List<Equipment> findByProjetId(Long projetId);
}
