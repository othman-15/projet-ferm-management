import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const keycloakService = inject(KeycloakService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Unauthorized - Redirecting to login');
        keycloakService.login({
          redirectUri: window.location.origin + router.url,
        });
      } else if (error.status === 403) {
        console.error('Forbidden - Insufficient permissions');
        router.navigate(['/unauthorized']);
      } else if (error.status === 500) {
        console.error('Server Error:', error.message);
      }

      return throwError(() => error);
    })
  );
};
