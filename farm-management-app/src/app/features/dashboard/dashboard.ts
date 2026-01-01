import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ResponseProjetDTO, Statusprojet } from '../../core/models/projet.model';
import { StatutHelper } from '../../core/helpers/statut.helper';
import {AuthService, UserInfo} from '../../core/services/auth';
import {ProjetService} from '../../core/services/api/projet';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private projetService = inject(ProjetService);
  public router = inject(Router);

  userInfo: UserInfo | null = null;
  projets: ResponseProjetDTO[] = [];
  isLoading = true;
  errorMessage = '';

  async ngOnInit() {
    try {
      this.userInfo = await this.authService.getUserInfo();
      console.log('User Info:', this.userInfo);
      this.loadProjets();
    } catch (error) {
      console.error('Error loading user info:', error);
      this.errorMessage = 'Erreur lors du chargement des informations utilisateur';
      this.isLoading = false;
    }
  }

  loadProjets() {
    this.projetService.getAllProjets().subscribe({
      next: (projets) => {
        this.projets = projets;
        this.isLoading = false;
        console.log('Projets chargés:', projets);
      },
      error: (error) => {
        console.error('Error loading projets:', error);
        this.errorMessage = 'Erreur lors du chargement des projets';
        this.isLoading = false;

        if (error.status === 401) {
          this.authService.login();
        }
      }
    });
  }

  getProjetsByStatut(statut: string): ResponseProjetDTO[] {
    return this.projets.filter(p => p.statusProjet === statut);
  }

  viewProjetDetail(projetId: number) {
    this.router.navigate(['/projets', projetId]);
  }

  createNewProjet() {
    this.router.navigate(['/projets/new']);
  }

  getStatutColor(statut: Statusprojet): string {
    return StatutHelper.getStatutColor(statut);
  }

  getStatutLabel(statut: Statusprojet): string {
    return StatutHelper.getStatutLabel(statut);
  }

  getStatutIcon(statut: Statusprojet): string {
    return StatutHelper.getStatutIcon(statut);
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  refresh() {
    this.isLoading = true;
    this.errorMessage = '';
    this.loadProjets();
  }
}
