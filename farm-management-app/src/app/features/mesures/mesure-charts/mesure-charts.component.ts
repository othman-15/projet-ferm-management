import { Component, OnInit, OnDestroy, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

import { Mesure, QueryMesureInput } from '../../../core/models/projet.model';
import {MesureService} from '../../../core/services/api/mesure';
import {ChartService} from '../../../core/services/chart';

// Enregistrer tous les composants Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-mesure-charts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mesure-charts.component.html',
  styleUrl: './mesure-charts.component.css'
})
export class MesureChartsComponent implements OnInit, OnDestroy {
  @ViewChild('lineChartCanvas', { static: false }) lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChartCanvas', { static: false }) barChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas', { static: false }) pieChartCanvas!: ElementRef<HTMLCanvasElement>;

  private mesureService = inject(MesureService);
  private chartService = inject(ChartService);
  private route = inject(ActivatedRoute);

  mesures: Mesure[] = [];
  isLoading = true;
  errorMessage = '';

  // Charts
  private lineChart: Chart | null = null;
  private barChart: Chart | null = null;
  private pieChart: Chart | null = null;

  // Filters
  selectedCapteurId = '';
  dateDebut = '';
  dateFin = '';
  selectedPeriod = '7'; // Derniers 7 jours par défaut

  // Stats
  stats = {
    min: 0,
    max: 0,
    avg: 0,
    count: 0
  };

  ngOnInit() {
    this.setDefaultDates();
    this.loadMesures();
  }

  ngOnDestroy() {
    this.destroyCharts();
  }

  setDefaultDates() {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    this.dateFin = now.toISOString().split('T')[0];
    this.dateDebut = weekAgo.toISOString().split('T')[0];
  }

  changePeriod() {
    const now = new Date();
    const daysAgo = new Date(now.getTime() - parseInt(this.selectedPeriod) * 24 * 60 * 60 * 1000);

    this.dateFin = now.toISOString().split('T')[0];
    this.dateDebut = daysAgo.toISOString().split('T')[0];

    this.loadMesures();
  }

  loadMesures() {
    this.isLoading = true;
    this.destroyCharts();

    const filters: QueryMesureInput = {
      limit: 1000,
      page: 1
    };

    if (this.selectedCapteurId) {
      filters.capteurId = this.selectedCapteurId;
    }

    if (this.dateDebut) {
      filters.dateDebut = new Date(this.dateDebut).toISOString();
    }

    if (this.dateFin) {
      const endDate = new Date(this.dateFin);
      endDate.setHours(23, 59, 59, 999);
      filters.dateFin = endDate.toISOString();
    }

    this.mesureService.getMesures(filters).subscribe({
      next: (result) => {
        this.mesures = result.data.sort((a, b) =>
          new Date(a.dateMesure).getTime() - new Date(b.dateMesure).getTime()
        );
        this.calculateStats();
        this.isLoading = false;

        // Créer les graphiques après un court délai
        setTimeout(() => {
          this.createLineChart();
          this.createBarChart();
          this.createQualityPieChart();
        }, 100);
      },
      error: (error) => {
        console.error('Error loading mesures:', error);
        this.errorMessage = 'Erreur lors du chargement des mesures';
        this.isLoading = false;
      }
    });
  }

  calculateStats() {
    this.stats = this.mesureService.calculateStats(this.mesures);
  }

  createLineChart() {
    if (!this.lineChartCanvas || this.mesures.length === 0) return;

    const canvas = this.lineChartCanvas.nativeElement;
    const data = this.mesureService.prepareMesuresForChart(this.mesures);

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: `Valeur (${this.mesures[0]?.unite || ''})`,
          data: data.data,
          borderColor: '#16a34a',
          backgroundColor: 'rgba(22, 163, 74, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Évolution des Mesures',
            font: { size: 16, weight: 'bold' }
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: this.mesures[0]?.unite || 'Valeur'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date et Heure'
            }
          }
        }
      }
    };

    this.lineChart = new Chart(canvas, config);
  }

  createBarChart() {
    if (!this.barChartCanvas || this.mesures.length === 0) return;

    const canvas = this.barChartCanvas.nativeElement;

    // Grouper par jour
    const groupedByDay = this.groupMesuresByDay();
    const labels = Object.keys(groupedByDay);
    const avgData = labels.map(day => groupedByDay[day].avg);

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `Moyenne par jour (${this.mesures[0]?.unite || ''})`,
          data: avgData,
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: '#3b82f6',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Moyenne des Mesures par Jour',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: this.mesures[0]?.unite || 'Valeur'
            }
          }
        }
      }
    };

    this.barChart = new Chart(canvas, config);
  }

  createQualityPieChart() {
    if (!this.pieChartCanvas || this.mesures.length === 0) return;

    const canvas = this.pieChartCanvas.nativeElement;

    const bonnes = this.mesures.filter(m => m.qualiteDonnee === 'BONNE').length;
    const moyennes = this.mesures.filter(m => m.qualiteDonnee === 'MOYENNE').length;
    const mauvaises = this.mesures.filter(m => m.qualiteDonnee === 'MAUVAISE').length;

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['Bonne', 'Moyenne', 'Mauvaise'],
        datasets: [{
          data: [bonnes, moyennes, mauvaises],
          backgroundColor: [
            '#16a34a',
            '#f59e0b',
            '#ef4444'
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right'
          },
          title: {
            display: true,
            text: 'Répartition par Qualité',
            font: { size: 16, weight: 'bold' }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = bonnes + moyennes + mauvaises;
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    };

    this.pieChart = new Chart(canvas, config);
  }

  groupMesuresByDay(): { [key: string]: { avg: number, count: number } } {
    const grouped: { [key: string]: number[] } = {};

    this.mesures.forEach(mesure => {
      const date = new Date(mesure.dateMesure);
      const day = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit'
      });

      if (!grouped[day]) {
        grouped[day] = [];
      }
      grouped[day].push(mesure.valeur);
    });

    const result: { [key: string]: { avg: number, count: number } } = {};

    Object.keys(grouped).forEach(day => {
      const values = grouped[day];
      const sum = values.reduce((acc, val) => acc + val, 0);
      result[day] = {
        avg: Math.round((sum / values.length) * 100) / 100,
        count: values.length
      };
    });

    return result;
  }

  destroyCharts() {
    if (this.lineChart) {
      this.lineChart.destroy();
      this.lineChart = null;
    }
    if (this.barChart) {
      this.barChart.destroy();
      this.barChart = null;
    }
    if (this.pieChart) {
      this.pieChart.destroy();
      this.pieChart = null;
    }
  }

  exportData() {
    const csvContent = this.convertToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `mesures_${new Date().toISOString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertToCSV(): string {
    const headers = ['Date', 'Capteur', 'Valeur', 'Unité', 'Qualité', 'Projet'];
    const rows = this.mesures.map(m => [
      new Date(m.dateMesure).toLocaleString('fr-FR'),
      m.capteurId,
      m.valeur,
      m.unite,
      m.qualiteDonnee,
      m.projetId
    ]);

    return [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
  }

  get uniqueCapteurs(): string[] {
    return [...new Set(this.mesures.map(m => m.capteurId))];
  }
}
