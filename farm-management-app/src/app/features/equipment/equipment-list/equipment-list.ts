import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ResponseEquipmentDto, TypeEquipment } from '../../../core/models/projet.model';
import { EquipmentHelper } from '../../../core/helpers/equipment.helper';
import {EquipmentService} from '../../../core/services/api/equipment';
import {AuthService} from '../../../core/services/auth';

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment-list.html',
  styleUrl: './equipment-list.css'
})
export class EquipmentListComponent implements OnInit {
  private equipmentService = inject(EquipmentService);
  private authService = inject(AuthService);
  public router = inject(Router);

  equipments: ResponseEquipmentDto[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit() {
    this.loadEquipments();
  }

  loadEquipments() {
    this.equipmentService.getAllEquipments().subscribe({
      next: (equipments) => {
        this.equipments = equipments;
        this.isLoading = false;
        console.log('Équipements chargés:', equipments);
      },
      error: (error) => {
        console.error('Error loading equipments:', error);
        this.errorMessage = 'Erreur lors du chargement des équipements';
        this.isLoading = false;

        if (error.status === 401) {
          this.authService.login();
        }
      }
    });
  }

  viewEquipmentDetail(equipmentId: number) {
    this.router.navigate(['/equipments', equipmentId]);
  }

  createNewEquipment() {
    this.router.navigate(['/equipments/new']);
  }

  deleteEquipment(event: Event, equipmentId: number) {
    event.stopPropagation();

    if (confirm('Êtes-vous sûr de vouloir supprimer cet équipement ?')) {
      this.equipmentService.deleteEquipment(equipmentId).subscribe({
        next: () => {
          this.equipments = this.equipments.filter(e => e.id !== equipmentId);
          console.log('Équipement supprimé');
        },
        error: (error) => {
          console.error('Error deleting equipment:', error);
          this.errorMessage = 'Erreur lors de la suppression de l\'équipement';
        }
      });
    }
  }

  // ✅ NOUVELLES MÉTHODES POUR LE TEMPLATE

  /**
   * Calculer le nombre total de capteurs
   */
  getTotalCapteurs(): number {
    return this.equipments.reduce((sum, e) => sum + (e.nombreCapteurs || 0), 0);
  }

  /**
   * Compter les équipements par type
   */
  countEquipmentsByType(type: string): number {
    return this.equipments.filter(e => e.type === type).length;
  }

  /**
   * Obtenir le label du type d'équipement
   */
  getEquipmentTypeLabel(type: TypeEquipment): string {
    return EquipmentHelper.getEquipmentTypeLabel(type);
  }

  /**
   * Obtenir l'icône du type d'équipement
   */
  getEquipmentTypeIcon(type: TypeEquipment): string {
    return EquipmentHelper.getEquipmentTypeIcon(type);
  }

  /**
   * Obtenir la classe CSS du type d'équipement
   */
  getEquipmentTypeColor(type: TypeEquipment): string {
    return EquipmentHelper.getEquipmentTypeColor(type);
  }

  /**
   * Vérifier si l'utilisateur a un rôle
   */
  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  /**
   * Retour au dashboard
   */
  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
