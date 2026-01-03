import { Routes } from '@angular/router';

import { roleGuard } from './core/guards/role.guard';
import {authGuard} from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'projets/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/projets/projet-detail/projet-detail')
      .then(m => m.ProjetDetailComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/components/unauthorized/unauthorized')
      .then(m => m.UnauthorizedComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found')
      .then(m => m.NotFoundComponent)
  }
];
