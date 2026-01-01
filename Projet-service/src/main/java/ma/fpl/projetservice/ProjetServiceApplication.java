package ma.fpl.projetservice;

import ma.fpl.projetservice.Repository.ProjetRepository;
import ma.fpl.projetservice.Service.ProjetService;
import ma.fpl.projetservice.entities.Projet;
import ma.fpl.projetservice.entities.Statusprojet;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
@EnableFeignClients
public class ProjetServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjetServiceApplication.class, args);
    }
    @Bean
    CommandLineRunner commandLineRunner(ProjetRepository projetRepository) {
        return args -> {

            Projet projet1 = Projet.builder()
                    .nom("Projet Citron")
                    .description("Culture biologique de citrons dans la région de Meknès")
                    .typeCulture("Agrumes")
                    .dateDebut(LocalDate.of(2024, 3, 15))
                    .dateFin(LocalDate.of(2024, 9, 30))
                    .statusProjet(Statusprojet.EN_COURS)
                    .build();


            Projet projet2 = Projet.builder()
                    .nom("Projet Olives")
                    .description("Production d'olives pour l'huile d'olive biologique")
                    .typeCulture("Oliviers")
                    .dateDebut(LocalDate.of(2024, 2, 1))
                    .dateFin(LocalDate.of(2024, 11, 30))
                    .statusProjet(Statusprojet.EN_COURS)
                    .build();


            Projet projet3 = Projet.builder()
                    .nom("Projet Blé")
                    .description("Culture de blé dur pour la production de semences")
                    .typeCulture("Céréales")
                    .dateDebut(LocalDate.of(2023, 11, 1))
                    .dateFin(LocalDate.of(2024, 6, 30))
                    .statusProjet(Statusprojet.TERMINE)
                    .build();


            Projet projet4 = Projet.builder()
                    .nom("Projet Tomates")
                    .description("Culture sous serre de tomates cerises")
                    .typeCulture("Légumes")
                    .dateDebut(LocalDate.of(2024, 4, 1))
                    .dateFin(LocalDate.of(2024, 8, 31))
                    .statusProjet(Statusprojet.PLANIFIE)
                    .build();
            projetRepository.save(projet1);
            projetRepository.save(projet2);
            projetRepository.save(projet3);
            projetRepository.save(projet4);

            System.out.println("4 projets ont été insérés avec succès !");
        };
    }

}
