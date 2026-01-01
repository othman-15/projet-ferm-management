import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-container">
      <div class="card error-card">
        <div class="error-icon">🚫</div>
        <h1 class="error-title">
          Accès Refusé
        </h1>
        <p class="error-message">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <button (click)="goBack()" class="btn-primary">
          Retour au Dashboard
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
    .error-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    .error-title {
      font-size: 1.875rem;
      font-weight: bold;
      color: #dc2626;
      margin-bottom: 0.5rem;
    }
    .error-message {
      color: #6b7280;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
  `]
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
