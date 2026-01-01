import { Statusprojet } from '../models/projet.model';

export class StatutHelper {

  static getStatutLabel(statut: Statusprojet): string {
    switch (statut) {
      case Statusprojet.EN_COURS:
        return 'En cours';
      case Statusprojet.TERMINE:
        return 'Terminé';
      case Statusprojet.EN_ATTENTE:
        return 'En attente';
      case Statusprojet.PLANIFIE:
        return 'Planifié';
      default:
        return statut;
    }
  }

  static getStatutColor(statut: Statusprojet): string {
    switch (statut) {
      case Statusprojet.EN_COURS:
        return 'status-active';
      case Statusprojet.TERMINE:
        return 'status-completed';
      case Statusprojet.EN_ATTENTE:
        return 'status-pending';
      case Statusprojet.PLANIFIE:
        return 'status-planned';
      default:
        return '';
    }
  }

  static getStatutIcon(statut: Statusprojet): string {
    switch (statut) {
      case Statusprojet.EN_COURS:
        return '🔄';
      case Statusprojet.TERMINE:
        return '✅';
      case Statusprojet.EN_ATTENTE:
        return '⏳';
      case Statusprojet.PLANIFIE:
        return '📅';
      default:
        return '📊';
    }
  }
}
