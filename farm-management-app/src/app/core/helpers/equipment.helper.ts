import { TypeEquipment, TypeCapteur } from '../models/projet.model';

export class EquipmentHelper {

  // ============================================
  // TYPE EQUIPMENT
  // ============================================

  static getEquipmentTypeLabel(type: TypeEquipment): string {
    switch (type) {
      case TypeEquipment.TRACTEUR:
        return 'Tracteur';
      case TypeEquipment.IRRIGATION:
        return 'Système d\'irrigation';
      case TypeEquipment.SERRE:
        return 'Serre';
      case TypeEquipment.STOCKAGE:
        return 'Stockage';
      case TypeEquipment.AUTRE:
        return 'Autre';
      default:
        return type;
    }
  }

  static getEquipmentTypeIcon(type: TypeEquipment): string {
    switch (type) {
      case TypeEquipment.TRACTEUR:
        return '🚜';
      case TypeEquipment.IRRIGATION:
        return '💧';
      case TypeEquipment.SERRE:
        return '🏠';
      case TypeEquipment.STOCKAGE:
        return '📦';
      case TypeEquipment.AUTRE:
        return '⚙️';
      default:
        return '🔧';
    }
  }

  static getEquipmentTypeColor(type: TypeEquipment): string {
    switch (type) {
      case TypeEquipment.TRACTEUR:
        return 'equipment-tracteur';
      case TypeEquipment.IRRIGATION:
        return 'equipment-irrigation';
      case TypeEquipment.SERRE:
        return 'equipment-serre';
      case TypeEquipment.STOCKAGE:
        return 'equipment-stockage';
      case TypeEquipment.AUTRE:
        return 'equipment-autre';
      default:
        return '';
    }
  }

  // ============================================
  // TYPE CAPTEUR
  // ============================================

  static getCapteurTypeLabel(type: TypeCapteur): string {
    switch (type) {
      case TypeCapteur.TEMPERATURE:
        return 'Température';
      case TypeCapteur.HUMIDITE:
        return 'Humidité';
      case TypeCapteur.PH:
        return 'pH';
      case TypeCapteur.LUMINOSITE:
        return 'Luminosité';
      case TypeCapteur.PRESSION:
        return 'Pression';
      case TypeCapteur.AUTRE:
        return 'Autre';
      default:
        return type;
    }
  }

  static getCapteurTypeIcon(type: TypeCapteur): string {
    switch (type) {
      case TypeCapteur.TEMPERATURE:
        return '🌡️';
      case TypeCapteur.HUMIDITE:
        return '💧';
      case TypeCapteur.PH:
        return '⚗️';
      case TypeCapteur.LUMINOSITE:
        return '💡';
      case TypeCapteur.PRESSION:
        return '📊';
      case TypeCapteur.AUTRE:
        return '📈';
      default:
        return '🔬';
    }
  }

  static getCapteurTypeColor(type: TypeCapteur): string {
    switch (type) {
      case TypeCapteur.TEMPERATURE:
        return 'capteur-temperature';
      case TypeCapteur.HUMIDITE:
        return 'capteur-humidite';
      case TypeCapteur.PH:
        return 'capteur-ph';
      case TypeCapteur.LUMINOSITE:
        return 'capteur-luminosite';
      case TypeCapteur.PRESSION:
        return 'capteur-pression';
      case TypeCapteur.AUTRE:
        return 'capteur-autre';
      default:
        return '';
    }
  }
}
