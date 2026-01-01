package ma.fpl.projetservice.Service;

import ma.fpl.projetservice.Dtos.*;
import ma.fpl.projetservice.entities.Projet;

import java.util.List;

public interface ProjetService {
    public ResponseProjetDTO getProjetById(Long id);
    public ResponseProjetDTO AddProjet(RequestProjetDTO requestProjetDTO);
    public ResponseProjetDTO UpdateProjet(Long id,RequestProjetDTO requestProjetDTO);
    public void DeleteProjet(Long id);
    public List<ResponseProjetDTO> getAllProjets();
    public ResponseAffectationDTO affecterBiologiste(Long projetId,RequestAffectationDTO requestDTO);
    public ProjetDetailDTO getProjetDetail(Long projetId);
}
