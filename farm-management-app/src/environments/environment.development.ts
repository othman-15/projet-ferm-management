export const environment = {
  production: false,
  apiGateway: 'http://localhost:8888',

  apiUrls: {
    // ✅ CHANGEMENT ICI : On pointe juste vers le Microservice (via Gateway)
    // Le service Angular ajoutera lui-même "/v1/projets"
    projet: 'http://localhost:8888/PROJET-SERVICE',

    // Pour les autres, appliquez la même logique si leurs services ajoutent aussi le chemin :
    equipment: 'http://localhost:8888/EQUIPMENT-SERVICE',
    biologiste: 'http://localhost:8888/biologiste-service', // Attention aux routes manuelles ici
    mesure: 'http://localhost:8888'      // Attention aux routes manuelles ici
  },

  // ✅ Accès direct (Bypass Gateway) - Utile pour tester si la Gateway bloque
  directServices: {
    // Ici, on tape directement sur le port 8085, mais on garde le /v1/projets
    projet: 'http://localhost:8085/v1/projets',
    biologiste: 'http://localhost:8082', // Vérifiez vos contrôleurs NestJS pour les préfixes
    equipment: 'http://localhost:8086',
    mesure: 'http://localhost:8083'
  },

  // ✅ GraphQL (service Mesure)
  graphql: {
    mesure: 'http://localhost:8888/mesures/graphql'  // Via Gateway
    // ou en direct : 'http://localhost:8083/graphql'
  },

  // ✅ Keycloak
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'Fpl-ferme-management',
    clientId: 'fpl-farm-angular-client'
  },

  // ✅ URLs de documentation (pour référence)
  docs: {
    projet: 'http://localhost:8085/swagger-ui/index.html',
    biologiste: 'http://localhost:8082/docs',
    equipment: 'http://localhost:8086/swagger-ui/index.html',
    mesure: 'http://localhost:8083/api',
    mesureGraphQL: 'http://localhost:8083/graphql'
  }
};
