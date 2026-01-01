package ma.fpl.projetservice.Service;

import jakarta.persistence.EntityNotFoundException;
import ma.fpl.projetservice.Dtos.*;
import ma.fpl.projetservice.Mappers.AffectationBiologisteMapper;
import ma.fpl.projetservice.Mappers.ProjetMapper;
import ma.fpl.projetservice.Repository.AffectationBiologisteRepository;
import ma.fpl.projetservice.Repository.ProjetRepository;
import ma.fpl.projetservice.client.BiologisteClient;
import ma.fpl.projetservice.entities.AffectationBiologiste;
import ma.fpl.projetservice.entities.Projet;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
@Service
@Transactional
public class ProjetServiceImp  implements ProjetService{
    private ProjetRepository projetRepository;
    private ProjetMapper projetMapper;
    private AffectationBiologisteMapper affectationMapper;
    private AffectationBiologisteRepository affectationRepository;
    private BiologisteClient biologisteClient;

    public ProjetServiceImp(ProjetRepository projetRepository, ProjetMapper projetMapper, AffectationBiologisteMapper affectationMapper, AffectationBiologisteRepository affectationRepository, BiologisteClient biologisteClient) {
        this.projetRepository = projetRepository;
        this.projetMapper = projetMapper;
        this.affectationMapper = affectationMapper;
        this.affectationRepository = affectationRepository;
        this.biologisteClient = biologisteClient;
    }


    @Override
    public ResponseProjetDTO getProjetById(Long id) {
       return projetMapper.Projet_To_DTO(projetRepository.findById(id).orElseThrow());
    }

    @Override
    public ResponseProjetDTO AddProjet(RequestProjetDTO requestProjetDTO) {
        Projet savedprojet = projetRepository.save(projetMapper.DTO_to_Projet(requestProjetDTO));

        return projetMapper.Projet_To_DTO(savedprojet);
    }

    @Override
    public ResponseProjetDTO UpdateProjet(Long id, RequestProjetDTO requestProjetDTO) {
        Projet nvProjet = projetMapper.DTO_to_Projet(requestProjetDTO);
        Projet projet = projetRepository.findById(id).orElseThrow();
        if(nvProjet.getStatusProjet()!= null){projet.setStatusProjet(nvProjet.getStatusProjet());}
        if(nvProjet.getNom()!= null){projet.setNom(nvProjet.getNom());}
        if(nvProjet.getDescription()!= null){projet.setDescription(nvProjet.getDescription());}
        if(nvProjet.getDateDebut() != null){projet.setDateDebut(nvProjet.getDateDebut());}
        if(nvProjet.getDateFin() != null){projet.setDateFin(nvProjet.getDateFin());}
        if(nvProjet.getTypeCulture() != null){projet.setTypeCulture(nvProjet.getTypeCulture());}
        Projet savedprojet = projetRepository.save(projet);
        return projetMapper.Projet_To_DTO(savedprojet);
    }


    @Override
    public void DeleteProjet(Long id) {
        projetRepository.deleteById(id);

    }



    @Override
    public List<ResponseProjetDTO> getAllProjets() {
        List<Projet> projetList = projetRepository.findAll();
        List<ResponseProjetDTO> responseProjetDTOList = new ArrayList<>();
        for (Projet projet : projetList) {
            responseProjetDTOList.add(projetMapper.Projet_To_DTO(projet));
        }
        return responseProjetDTOList;
    }

    @Override
    public ResponseAffectationDTO affecterBiologiste(
            Long projetId,
            RequestAffectationDTO requestDTO) {

        Projet projet = projetRepository.findById(projetId)
                .orElseThrow(() -> new RuntimeException("Projet non trouvé"));


        var response =
                biologisteClient.existsByKeycloakId(
                        requestDTO.getBiologisteId());

        if (!response.exists()) {
            throw new IllegalStateException(
                    "Biologiste inexistant ou non actif"
            );
        }


        if (affectationRepository
                .existsByProjetIdProjetAndBiologisteId(
                        projetId,
                        requestDTO.getBiologisteId())) {

            throw new IllegalStateException(
                    "Biologiste déjà affecté à ce projet"
            );
        }

        AffectationBiologiste affectation =
                affectationMapper.DTO_to_Entity(requestDTO);

        affectation.setProjet(projet);

        AffectationBiologiste saved =
                affectationRepository.save(affectation);

        return affectationMapper.Entity_to_DTO(saved);
    }

    @Override
    public ProjetDetailDTO getProjetDetail(Long projetId) {

        Projet projet = projetRepository
                .findByIdWithAffectations(projetId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Projet non trouvé")
                );

        List<BiologisteAffecteDTO> biologistes =
                projet.getAffectations().stream()
                        .map(aff -> {
                            var bio =
                                    biologisteClient.getByKeycloakId(
                                            aff.getBiologisteId()
                                    );

                            return new BiologisteAffecteDTO(
                                    aff.getBiologisteId(),
                                    bio.nom(),
                                    bio.telephone(),
                                    bio.specialite(),
                                    aff.getRoleDansProjet(),
                                    aff.getDateAffectation()
                            );
                        })
                        .toList();

        ProjetDetailDTO dto = new ProjetDetailDTO();
        dto.setIdProjet(projet.getIdProjet());
        dto.setNom(projet.getNom());
        dto.setDescription(projet.getDescription());
        dto.setStatut(projet.getStatusProjet());
        dto.setAffectations(biologistes);

        return dto;
    }
}
