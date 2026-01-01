package ma.fpl.projetservice.Repository;

import ma.fpl.projetservice.entities.AffectationBiologiste;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AffectationBiologisteRepository extends JpaRepository<AffectationBiologiste, Long> {
    boolean existsByProjetIdProjetAndBiologisteId(
            Long projetId,
            String biologisteId
    );
}
