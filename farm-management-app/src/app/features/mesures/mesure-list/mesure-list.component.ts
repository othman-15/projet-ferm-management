import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Mesure, QueryMesureInput, QualiteDonnee } from '../../../core/models/projet.model';
import { MesureHelper } from '../../../core/helpers/mesure.helper';
import {MesureService} from '../../../core/services/api/mesure';
import {AuthService} from '../../../core/services/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mesure-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mesure-list.component.html',
  styleUrl: './mesure-list.component.css'
})
export class MesureListComponent implements OnInit {
  private mesureService = inject(MesureService);
  private authService = inject(AuthService);
  private router = inject(Router);
  mesures: Mesure[] = [];
  allMesures: Mesure[] = [];
  isLoading = true;
  errorMessage = '';

  // Filters
  selectedCapteurId = '';
  selectedQualite = '';
  dateDebut = '';
  dateFin = '';

  ngOnInit() {
    this.loadMesures();
  }
  navigateToCharts() {
    this.router.navigate(['/mesures/charts']);
  }
  loadMesures() {
    const filters: QueryMesureInput = {
      limit: 100,
      page: 1
    };

    this.mesureService.getMesures(filters).subscribe({
      next: (result) => {
        this.allMesures = result.data;
        this.mesures = result.data;
        this.isLoading = false;
        console.log('Mesures chargées:', result);
      },
      error: (error) => {
        console.error('Error loading mesures:', error);
        this.errorMessage = 'Erreur lors du chargement des mesures';
        this.isLoading = false;

        if (error.graphQLErrors) {
          this.errorMessage = error.graphQLErrors[0]?.message || 'Erreur GraphQL';
        }
      }
    });
  }

  applyFilters() {
    let filtered = [...this.allMesures];

    // Filter by capteur
    if (this.selectedCapteurId) {
      filtered = filtered.filter(m => m.capteurId === this.selectedCapteurId);
    }

    // Filter by qualite
    if (this.selectedQualite) {
      filtered = filtered.filter(m => m.qualiteDonnee === this.selectedQualite);
    }

    // Filter by date range
    if (this.dateDebut) {
      const debut = new Date(this.dateDebut);
      filtered = filtered.filter(m => new Date(m.dateMesure) >= debut);
    }

    if (this.dateFin) {
      const fin = new Date(this.dateFin);
      filtered = filtered.filter(m => new Date(m.dateMesure) <= fin);
    }

    this.mesures = filtered;
  }

  resetFilters() {
    this.selectedCapteurId = '';
    this.selectedQualite = '';
    this.dateDebut = '';
    this.dateFin = '';
    this.mesures = [...this.allMesures];
  }

  get uniqueCapteurs(): string[] {
    return [...new Set(this.allMesures.map(m => m.capteurId))];
  }

  countByQualite(qualite: string): number {
    return this.mesures.filter(m => m.qualiteDonnee === qualite).length;
  }

  openCreateMesureModal() {
    // TODO: Implémenter le modal de création
    alert('Fonctionnalité à venir : Création de mesure');
  }

  viewDetails(id: string) {
    // TODO: Naviguer vers les détails
    console.log('View details:', id);
  }

  deleteMesure(id: string) {
    if (!this.authService.hasRole('ADMIN')) {
      alert('Seuls les administrateurs peuvent supprimer des mesures');
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer cette mesure ?')) {
      this.mesureService.deleteMesure(id).subscribe({
        next: () => {
          this.mesures = this.mesures.filter(m => m.id !== id);
          this.allMesures = this.allMesures.filter(m => m.id !== id);
          console.log('Mesure supprimée');
        },
        error: (error) => {
          console.error('Error deleting mesure:', error);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  getQualiteLabel(qualite: QualiteDonnee): string {
    return MesureHelper.getQualiteLabel(qualite);
  }

  getQualiteIcon(qualite: QualiteDonnee): string {
    return MesureHelper.getQualiteIcon(qualite);
  }

  getQualiteColor(qualite: QualiteDonnee): string {
    return MesureHelper.getQualiteColor(qualite);
  }

  formatDate(date: string): string {
    return MesureHelper.formatDate(date);
  }

  formatValeur(valeur: number, unite: string): string {
    return MesureHelper.formatValeur(valeur, unite);
  }
}
