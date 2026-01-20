import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {Mesure, ResponseProjetDTO, Statusprojet} from '../../core/models/projet.model';
import { StatutHelper } from '../../core/helpers/statut.helper';
import {AuthService, UserInfo} from '../../core/services/auth';
import {ProjetService} from '../../core/services/api/projet';
import {MesureService} from '../../core/services/api/mesure';

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
  private mesureService = inject(MesureService);
  latestMesures: Mesure[] = [];

  async ngOnInit() {
    try {
      this.userInfo = await this.authService.getUserInfo();
      console.log('User Info:', this.userInfo);
      this.loadProjets();
      this.loadLatestMesures(); // ✅ Ajouter
    } catch (error) {
      console.error('Error loading user info:', error);
      this.errorMessage = 'Erreur lors du chargement des informations utilisateur';
      this.isLoading = false;
    }
  }

  loadLatestMesures() {
    this.mesureService.getLatestMesures(5).subscribe({
      next: (mesures) => {
        this.latestMesures = mesures;
        console.log('Dernières mesures:', mesures);
      },
      error: (error) => {
        console.error('Error loading latest mesures:', error);
      }
    });
  }

  formatMesureDate(date: string): string {
    return new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  // async ngOnInit() {
  //   try {
  //     this.userInfo = await this.authService.getUserInfo();
  //     console.log('User Info:', this.userInfo);
  //     this.loadProjets();
  //   } catch (error) {
  //     console.error('Error loading user info:', error);
  //     this.errorMessage = 'Erreur lors du chargement des informations utilisateur';
  //     this.isLoading = false;
  //   }
  // }

  loadProjets() {
    this.isLoading = true; // On affiche le spinner

    this.projetService.getAllProjets().subscribe({
      next: (data: any) => {
        console.log('✅ DONNÉES REÇUES :', data);

        // CAS 1 : C'est un tableau direct (votre cas actuel)
        if (Array.isArray(data)) {
          this.projets = data;
        }
        // CAS 2 : C'est une page Spring Data (au cas où vous changeriez le backend)
        else if (data.content && Array.isArray(data.content)) {
          this.projets = data.content;
        }
        // CAS 3 : Sécurité
        else {
          this.projets = [];
          console.error('❌ Format de données inconnu');
        }

        this.isLoading = false; // On cache le spinner
      },
      error: (error) => {
        console.error('❌ Erreur HTTP :', error);
        this.errorMessage = 'Impossible de charger les projets.';
        this.isLoading = false;
      }
    });
  }

  getProjetsByStatut(statut: string): ResponseProjetDTO[] {
    return this.projets.filter(p => p.statut === statut);
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
