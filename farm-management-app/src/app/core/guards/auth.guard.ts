import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const authGuard: CanActivateFn = async (route, state) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  try {
    const isLoggedIn = await keycloakService.isLoggedIn();

    if (!isLoggedIn) {
      await keycloakService.login({
        redirectUri: window.location.origin + state.url,
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error('Auth Guard Error:', error);
    return false;
  }
};
