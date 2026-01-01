package ma.fpl.projetservice.Repository;

import ma.fpl.projetservice.entities.Projet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProjetRepository extends JpaRepository<Projet, Long> {
    @Query("""
        SELECT p FROM Projet p
        LEFT JOIN FETCH p.affectations
        WHERE p.idProjet = :id
    """)
    Optional<Projet> findByIdWithAffectations(@Param("id") Long id);
}
