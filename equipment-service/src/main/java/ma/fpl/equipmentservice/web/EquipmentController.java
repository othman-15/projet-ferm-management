package ma.fpl.equipmentservice.web;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import ma.fpl.equipmentservice.dtos.*;
import ma.fpl.equipmentservice.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/equipments")

@SecurityRequirement(name = "JWT-auth")
public class EquipmentController {

    private final EquipmentService equipmentService;

    public EquipmentController(EquipmentService equipmentService) {
        this.equipmentService = equipmentService;
    }



    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseEquipmentDto> createEquipment(
            @RequestBody RequestEquipmentDto dto
    ) {
        return ResponseEntity.ok(
                equipmentService.createEquipment(dto)
        );
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<ResponseEquipmentDto>> getAllEquipments() {
        return ResponseEntity.ok(
                equipmentService.getAllEquipments()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseEquipmentDto> getEquipmentById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                equipmentService.getEquipmentById(id)
        );
    }

    @GetMapping("/projet/{projetId}")
    public ResponseEntity<List<ResponseEquipmentDto>> getEquipmentsByProjet(
            @PathVariable Long projetId
    ) {
        return ResponseEntity.ok(
                equipmentService.getEquipmentsByProjetId(projetId)
        );
    }

    @GetMapping("/capteurs/{capteurId}")
    public ResponseEntity<ResponseCapteurDto> getCapteurById(
            @PathVariable Long capteurId
    ) {
        return ResponseEntity.ok(
                equipmentService.getCapteurById(capteurId)
        );
    }

    @PostMapping("/{equipmentId}/capteurs")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseCapteurDto> addCapteur(
            @PathVariable Long equipmentId,
            @RequestBody RequestCapteurDto dto
    ) {
        return ResponseEntity.ok(
                equipmentService.addCapteurToEquipment(equipmentId, dto)
        );
    }

    @GetMapping("/{equipmentId}/capteurs")
    public ResponseEntity<List<ResponseCapteurDto>> getCapteursByEquipment(
            @PathVariable Long equipmentId
    ) {
        return ResponseEntity.ok(
                equipmentService.getCapteursByEquipment(equipmentId)
        );
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
        equipmentService.deleteEquipment(id);
        return ResponseEntity.noContent().build();
    }


    @DeleteMapping("/{equipmentId}/capteurs/{capteurId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> removeCapteur(
            @PathVariable Long equipmentId,
            @PathVariable Long capteurId
    ) {
        equipmentService.removeCapteur(equipmentId, capteurId);
        return ResponseEntity.noContent().build();
    }
}
