import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CreateMesureInput,
  QueryMesureInput,
  Mesure,
  MesurePagination,
  MesureStatistics
} from '../../models/projet.model';

@Injectable({
  providedIn: 'root'
})
export class MesureService {
  private apollo = inject(Apollo);

  // ============================================
  // GRAPHQL QUERIES
  // ============================================

  /**
   * Query : Récupérer toutes les mesures avec pagination
   */
  getMesures(filters?: QueryMesureInput): Observable<MesurePagination> {
    return this.apollo.query<{ mesures: MesurePagination }>({
      query: gql`
        query GetMesures($filters: QueryMesureInput) {
          mesures(filters: $filters) {
            data {
              id
              valeur
              unite
              dateMesure
              qualiteDonnee
              capteurId
              projetId
              createdAt
              updatedAt
            }
            total
            page
            limit
            totalPages
          }
        }
      `,
      variables: { filters },
      fetchPolicy: 'network-only'
    }).pipe(
      map(result => result.data.mesures)
    );
  }

  /**
   * Query : Récupérer les mesures d'un projet
   */
  getMesuresByProjet(projetId: string): Observable<Mesure[]> {
    return this.apollo.query<{ mesuresByProjet: Mesure[] }>({
      query: gql`
        query GetMesuresByProjet($projetId: String!) {
          mesuresByProjet(projetId: $projetId) {
            id
            valeur
            unite
            dateMesure
            qualiteDonnee
            capteurId
            projetId
            createdAt
            updatedAt
          }
        }
      `,
      variables: { projetId },
      fetchPolicy: 'network-only'
    }).pipe(
      map(result => result.data.mesuresByProjet)
    );
  }

  /**
   * Query : Récupérer une mesure par ID
   */
  getMesureById(id: string): Observable<Mesure> {
    return this.apollo.query<{ mesure: Mesure }>({
      query: gql`
        query GetMesure($id: String!) {
          mesure(id: $id) {
            id
            valeur
            unite
            dateMesure
            qualiteDonnee
            capteurId
            projetId
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id },
      fetchPolicy: 'network-only'
    }).pipe(
      map(result => result.data.mesure)
    );
  }

  /**
   * Query : Récupérer les mesures d'un capteur
   */
  getMesuresByCapteur(capteurId: string, filters?: QueryMesureInput): Observable<Mesure[]> {
    const queryFilters = {
      ...filters,
      capteurId
    };

    return this.getMesures(queryFilters).pipe(
      map(result => result.data)
    );
  }

  // ============================================
  // GRAPHQL MUTATIONS
  // ============================================

  /**
   * Mutation : Créer une nouvelle mesure
   */
  createMesure(input: CreateMesureInput): Observable<Mesure> {
    return this.apollo.mutate<{ createMesure: Mesure }>({
      mutation: gql`
        mutation CreateMesure($input: CreateMesureInput!) {
          createMesure(input: $input) {
            id
            valeur
            unite
            dateMesure
            qualiteDonnee
            capteurId
            projetId
            createdAt
            updatedAt
          }
        }
      `,
      variables: { input }
    }).pipe(
      map(result => result.data!.createMesure)
    );
  }

  /**
   * Mutation : Supprimer une mesure (ADMIN uniquement)
   */
  deleteMesure(id: string): Observable<boolean> {
    return this.apollo.mutate<{ deleteMesure: boolean }>({
      mutation: gql`
        mutation DeleteMesure($id: String!) {
          deleteMesure(id: $id)
        }
      `,
      variables: { id }
    }).pipe(
      map(result => result.data!.deleteMesure)
    );
  }

  // ============================================
  // MÉTHODES UTILITAIRES
  // ============================================

  /**
   * Filtrer les mesures par période
   */
  getMesuresByPeriod(
    capteurId: string,
    dateDebut: Date,
    dateFin: Date
  ): Observable<Mesure[]> {
    const filters: QueryMesureInput = {
      capteurId,
      dateDebut: dateDebut.toISOString(),
      dateFin: dateFin.toISOString(),
      limit: 1000
    };

    return this.getMesures(filters).pipe(
      map(result => result.data)
    );
  }

  /**
   * Filtrer les mesures par qualité
   */
  getMesuresByQualite(
    projetId: string,
    qualiteDonnee: string
  ): Observable<Mesure[]> {
    const filters: QueryMesureInput = {
      projetId,
      qualiteDonnee: qualiteDonnee as any,
      limit: 1000
    };

    return this.getMesures(filters).pipe(
      map(result => result.data)
    );
  }

  /**
   * Obtenir les dernières mesures
   */
  getLatestMesures(limit: number = 10): Observable<Mesure[]> {
    const filters: QueryMesureInput = {
      limit,
      page: 1
    };

    return this.getMesures(filters).pipe(
      map(result => result.data)
    );
  }

  /**
   * Préparer les données pour Chart.js
   */
  prepareMesuresForChart(mesures: Mesure[]): {
    labels: string[];
    data: number[];
  } {
    return {
      labels: mesures.map(m => new Date(m.dateMesure).toLocaleString('fr-FR')),
      data: mesures.map(m => m.valeur)
    };
  }

  /**
   * Calculer des statistiques simples
   */
  calculateStats(mesures: Mesure[]): {
    min: number;
    max: number;
    avg: number;
    count: number;
  } {
    if (mesures.length === 0) {
      return { min: 0, max: 0, avg: 0, count: 0 };
    }

    const values = mesures.map(m => m.valeur);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const avg = sum / values.length;

    return {
      min,
      max,
      avg: Math.round(avg * 100) / 100,
      count: mesures.length
    };
  }
}
