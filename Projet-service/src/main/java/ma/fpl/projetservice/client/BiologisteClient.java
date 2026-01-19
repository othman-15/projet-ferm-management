package ma.fpl.projetservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "biologiste-service",
        url = "${GATEWAY_URL:http://localhost:8888}/farm-biologiste-service"


)
public interface BiologisteClient {



    @GetMapping("/api/biologistes/keycloak/{id}/exists")
    ExistsResponse existsByKeycloakId(
            @PathVariable("id") String keycloakId
    );

    @GetMapping("/api/biologistes/keycloak/{id}")
    BiologisteResponse getByKeycloakId(
            @PathVariable("id") String keycloakId
    );

    record ExistsResponse(boolean exists) {}

    record BiologisteResponse(
            String keycloakUserId,
            String nom,
            String telephone,
            String specialite
    ) {}
}