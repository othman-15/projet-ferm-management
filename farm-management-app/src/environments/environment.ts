export const environment = {
  production: true,

  // API Gateway en production
  apiGateway: 'https://api.farm.example.com',

  // Tous les services via Gateway en production
  apiUrls: {
    projet: 'https://api.farm.example.com/projets',
    equipment: 'https://api.farm.example.com/equipments',
    biologiste: 'https://api.farm.example.com/api/biologistes',
    mesure: 'https://api.farm.example.com/mesures'
  },

  // Pas d'accès direct en production
  directServices: {
    projet: '',
    biologiste: '',
    equipment: '',
    mesure: ''
  },

  // GraphQL via Gateway
  graphql: {
    mesure: 'https://api.farm.example.com/mesures/graphql'
  },

  // Keycloak production
  keycloak: {
    url: 'https://keycloak.farm.example.com',
    realm: 'Fpl-ferme-management',
    clientId: 'fpl-farm-angular-client'
  },

  docs: {
    projet: '',
    biologiste: '',
    equipment: '',
    mesure: '',
    mesureGraphQL: ''
  }
};
