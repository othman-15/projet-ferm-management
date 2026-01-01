package ma.fpl.projetservice.web;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import ma.fpl.projetservice.Dtos.*;
import ma.fpl.projetservice.Service.ProjetService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@SecurityRequirement(name = "JWT-auth")
@RestController
@RequestMapping("/v1/projets")
public class ApiRestfull {
    private final ProjetService projetService;

    public ApiRestfull(ProjetService projetService) {
        this.projetService = projetService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseProjetDTO> add(@RequestBody RequestProjetDTO requestProjetDTO ) {
        ResponseProjetDTO responseProjetDTO = projetService.AddProjet(requestProjetDTO);
        return ResponseEntity.ok(responseProjetDTO);
    }
    @GetMapping("/{id}")
    public  ResponseEntity<ResponseProjetDTO> getProjetById(@PathVariable("id") Long id){
        ResponseProjetDTO responseProjetDTO = projetService.getProjetById(id);
        return ResponseEntity.ok(responseProjetDTO);
    }
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<ResponseProjetDTO>> getAllProjet(){
        List<ResponseProjetDTO> responseProjetDTOlist = projetService.getAllProjets();
        return ResponseEntity.ok(responseProjetDTOlist);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ResponseProjetDTO> update(@PathVariable Long id,@RequestBody RequestProjetDTO requestProjetDTO){
        ResponseProjetDTO responseProjetDTO = projetService.UpdateProjet(id, requestProjetDTO);
        return ResponseEntity.ok(responseProjetDTO);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseProjetDTO> delete(@PathVariable Long id){
        projetService.DeleteProjet(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/biologistes")
    public ResponseEntity<ResponseAffectationDTO> affecterBiologiste(
            @PathVariable Long id,
            @RequestBody RequestAffectationDTO dto) {

        ResponseAffectationDTO response =
                projetService.affecterBiologiste(id, dto);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<ProjetDetailDTO> getProjetDetail(
            @PathVariable Long id
    ) {
        ProjetDetailDTO projet = projetService.getProjetDetail(id);
        return ResponseEntity.ok(projet);
    }

}
