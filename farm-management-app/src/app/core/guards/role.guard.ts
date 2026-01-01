import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return async (route, state) => {
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

      const userRoles = keycloakService.getUserRoles();
      const hasRequiredRole = allowedRoles.some(role =>
        userRoles.includes(role)
      );

      if (!hasRequiredRole) {
        router.navigate(['/unauthorized']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Role Guard Error:', error);
      router.navigate(['/unauthorized']);
      return false;
    }
  };
};
