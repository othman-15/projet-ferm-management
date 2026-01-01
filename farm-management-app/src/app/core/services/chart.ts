import { Injectable } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartType,
  registerables
} from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() {
    // Enregistrer tous les composants Chart.js
    Chart.register(...registerables);
  }

  createChart(
    canvas: HTMLCanvasElement,
    type: ChartType,
    data: any,
    options?: any
  ): Chart {
    return new Chart(canvas, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...options
      }
    });
  }

  destroyChart(chart: Chart | null): void {
    if (chart) {
      chart.destroy();
    }
  }

  // Méthode utilitaire pour créer un graphique en ligne
  createLineChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    datasets: any[],
    options?: any
  ): Chart {
    return this.createChart(canvas, 'line', { labels, datasets }, options);
  }

  // Méthode utilitaire pour créer un graphique en barres
  createBarChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    datasets: any[],
    options?: any
  ): Chart {
    return this.createChart(canvas, 'bar', { labels, datasets }, options);
  }

  // Méthode utilitaire pour créer un graphique circulaire
  createPieChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    data: number[],
    options?: any
  ): Chart {
    return this.createChart(
      canvas,
      'pie',
      {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            '#22c55e',
            '#0ea5e9',
            '#f59e0b',
            '#ef4444',
            '#8b5cf6'
          ]
        }]
      },
      options
    );
  }
}
