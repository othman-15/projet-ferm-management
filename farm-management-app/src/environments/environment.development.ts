export const environment = {
  production: false,
  apiUrls: {
    projet: 'http://localhost:8085',      // Microservice Projet (Spring Boot)
    biologiste: 'http://localhost:8082'   // Microservice Biologiste (NestJS)
  },
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'Fpl-ferme-management',
    clientId: 'fpl-farm-angular-client'
  }
};
