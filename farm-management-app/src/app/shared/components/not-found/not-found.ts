import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-container">
      <div class="card error-card">
        <div class="error-code">404</div>
        <h1 class="error-title">
          Page Non Trouvée
        </h1>
        <p class="error-message">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <button (click)="goHome()" class="btn-primary">
          Retour à l'Accueil
        </button>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f3f4f6;
      padding: 1rem;
    }
    .error-card {
      max-width: 28rem;
      text-align: center;
    }
    .error-code {
      font-size: 6rem;
      font-weight: bold;
      color: #d1d5db;
      margin-bottom: 1rem;
      line-height: 1;
    }
    .error-title {
      font-size: 1.875rem;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }
    .error-message {
      color: #6b7280;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
  `]
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
