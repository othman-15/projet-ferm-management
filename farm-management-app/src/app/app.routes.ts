import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/layout/main-layout/main-layout')
      .then(m => m.MainLayoutComponent),
    children: [
      // ========================================
      // DASHBOARD
      // ========================================
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard')
          .then(m => m.DashboardComponent)
      },

      // ========================================
      // PROJETS
      // ========================================
      {
        path: 'projets/new',
        canActivate: [roleGuard(['ADMIN'])],
        loadComponent: () => import('./features/projets/projet-form/projet-form.component')
          .then(m => m.ProjetFormComponent)
      },
      {
        path: 'projets/:id/edit',
        canActivate: [roleGuard(['ADMIN'])],
        loadComponent: () => import('./features/projets/projet-form/projet-form.component')
          .then(m => m.ProjetFormComponent)
      },
      {
        path: 'projets/:id',
        loadComponent: () => import('./features/projets/projet-detail/projet-detail')
          .then(m => m.ProjetDetailComponent)
      },

      // ========================================
      // BIOLOGISTES
      // ========================================
      {
        path: 'biologistes/new',
        canActivate: [roleGuard(['ADMIN', 'BIOLOGISTE'])],
        loadComponent: () => import('./features/biologistes/biologiste-form/biologiste-form.component')
          .then(m => m.BiologisteFormComponent)
      },

      // ========================================
      // ÉQUIPEMENTS
      // ========================================
      {
        path: 'equipments',
        canActivate: [roleGuard(['ADMIN'])],
        loadComponent: () => import('./features/equipment/equipment-list/equipment-list')
          .then(m => m.EquipmentListComponent)
      },

      // ========================================
      // MESURES
      // ========================================
      {
        path: 'mesures',
        canActivate: [roleGuard(['ADMIN', 'BIOLOGISTE'])],
        loadComponent: () => import('./features/mesures/mesure-list/mesure-list.component')
          .then(m => m.MesureListComponent)
      },
      {
        path: 'mesures/charts',
        canActivate: [roleGuard(['ADMIN', 'BIOLOGISTE'])],
        loadComponent: () => import('./features/mesures/mesure-charts/mesure-charts.component')
          .then(m => m.MesureChartsComponent)
      }
    ]
  },

  // ========================================
  // PAGES D'ERREUR
  // ========================================
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
