import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjetDetailDTO, Statusprojet } from '../../../core/models/projet.model';
import { StatutHelper } from '../../../core/helpers/statut.helper';
import { AssignBiologisteModalComponent } from '../assign-biologiste-modal/assign-biologiste-modal.component';
import {ProjetService} from '../../../core/services/api/projet';
import {BiologisteService} from '../../../core/services/api/biologiste';
import {AuthService} from '../../../core/services/auth';

@Component({
  selector: 'app-projet-detail',
  standalone: true,
  imports: [CommonModule, AssignBiologisteModalComponent], // ✅ Ajouter le modal
  templateUrl: './projet-detail.html',
  styleUrl: './projet-detail.css'
})
export class ProjetDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projetService = inject(ProjetService);
  private biologisteService = inject(BiologisteService);
  private authService = inject(AuthService);

  projet: ProjetDetailDTO | null = null;
  isLoading = true;
  errorMessage = '';
  projetId: number = 0;

  // ✅ Contrôle du modal
  isAssignModalOpen = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projetId = +params['id'];
      if (this.projetId) {
        this.loadProjetDetail();
      } else {
        this.errorMessage = 'ID de projet invalide';
        this.isLoading = false;
      }
    });
  }

  loadProjetDetail() {
    this.projetService.getProjetDetail(this.projetId).subscribe({
      next: (projet) => {
        this.projet = projet;
        this.isLoading = false;
        console.log('Projet detail:', projet);
      },
      error: (error) => {
        console.error('Error loading projet detail:', error);
        this.errorMessage = 'Erreur lors du chargement des détails du projet';
        this.isLoading = false;

        if (error.status === 404) {
          this.errorMessage = 'Projet non trouvé';
        } else if (error.status === 401) {
          this.authService.login();
        } else if (error.status === 403) {
          this.errorMessage = 'Vous n\'avez pas les permissions pour voir ce projet';
        }
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  editProjet() {
    this.router.navigate(['/projets', this.projetId, 'edit']);
  }

  deleteProjet() {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projetService.deleteProjet(this.projetId).subscribe({
        next: () => {
          console.log('Projet supprimé');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error deleting projet:', error);
          this.errorMessage = 'Erreur lors de la suppression du projet';
        }
      });
    }
  }

  // ✅ Ouvrir le modal d'affectation
  openAssignModal() {
    this.isAssignModalOpen = true;
  }

  // ✅ Fermer le modal
  closeAssignModal() {
    this.isAssignModalOpen = false;
  }

  // ✅ Recharger après affectation réussie
  onAssignSuccess() {
    this.loadProjetDetail();
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

  getTimeSinceAffectation(dateAffectation: string): string {
    const date = new Date(dateAffectation);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 30) return `Il y a ${diffDays} jours`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return "Il y a 1 mois";
    if (diffMonths < 12) return `Il y a ${diffMonths} mois`;

    const diffYears = Math.floor(diffMonths / 12);
    return diffYears === 1 ? "Il y a 1 an" : `Il y a ${diffYears} ans`;
  }
  calculateDuration(dateDebut: string | null | undefined, dateFin: string | null | undefined): number {
    if (!dateDebut || !dateFin) {
      return 0;
    }
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const diffTime = Math.abs(fin.getTime() - debut.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  getInitials(nom: string): string {
    if (!nom) return '??';
    const parts = nom.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nom.substring(0, 2).toUpperCase();
  }
}
