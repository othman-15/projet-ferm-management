import { QualiteDonnee } from '../models/projet.model';

export class MesureHelper {

  static getQualiteLabel(qualite: QualiteDonnee): string {
    switch (qualite) {
      case QualiteDonnee.BONNE:
        return 'Bonne';
      case QualiteDonnee.MOYENNE:
        return 'Moyenne';
      case QualiteDonnee.MAUVAISE:
        return 'Mauvaise';
      default:
        return qualite;
    }
  }

  static getQualiteColor(qualite: QualiteDonnee): string {
    switch (qualite) {
      case QualiteDonnee.BONNE:
        return 'qualite-bonne';
      case QualiteDonnee.MOYENNE:
        return 'qualite-moyenne';
      case QualiteDonnee.MAUVAISE:
        return 'qualite-mauvaise';
      default:
        return '';
    }
  }

  static getQualiteIcon(qualite: QualiteDonnee): string {
    switch (qualite) {
      case QualiteDonnee.BONNE:
        return '✅';
      case QualiteDonnee.MOYENNE:
        return '⚠️';
      case QualiteDonnee.MAUVAISE:
        return '❌';
      default:
        return '❓';
    }
  }

  static formatValeur(valeur: number, unite: string): string {
    return `${valeur.toFixed(2)} ${unite}`;
  }

  static formatDate(date: string): string {
    return new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
