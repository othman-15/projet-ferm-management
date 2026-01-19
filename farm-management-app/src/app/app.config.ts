import { ApplicationConfig, APP_INITIALIZER, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

import { HttpLink } from 'apollo-angular/http';
import { provideApollo } from 'apollo-angular';

import { routes } from './app.routes';
import { initializeKeycloak } from './core/init/keycloak-init.factory';

import { createApollo } from './core/graphql/apollo.provider';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    // ✅ Fixed: passing dependencies via inject()
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return createApollo(httpLink);
    }),
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
};
