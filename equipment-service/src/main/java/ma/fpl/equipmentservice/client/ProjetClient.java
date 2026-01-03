package ma.fpl.equipmentservice.client;


import ma.fpl.equipmentservice.dtos.ProjetExistsResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient( name = "Projet-service",
        url = "http://localhost:8085")
public interface ProjetClient {

    @GetMapping("/v1/projets/{id}")
    ProjetExistsResponse existsById(@PathVariable Long id);
}