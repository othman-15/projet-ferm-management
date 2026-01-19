import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UpsertBiologisteDto } from '../../../core/models/projet.model';
import { BiologisteService } from '../../../core/services/api/biologiste';
import {AuthService} from '../../../core/services/auth';

@Component({
  selector: 'app-biologiste-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './biologiste-form.component.html',
  styleUrl: './biologiste-form.component.css'
})
export class BiologisteFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private biologisteService = inject(BiologisteService);
  private authService = inject(AuthService);
  private router = inject(Router);

  biologisteForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  currentUserKeycloakId = '';

  ngOnInit() {
    this.loadCurrentUser();
    this.initForm();
  }

  async loadCurrentUser() {
    try {
      const userInfo = await this.authService.getUserInfo();
      // Extraire le Keycloak ID depuis les informations utilisateur
      // Note: Vous devrez peut-être ajuster selon votre structure Keycloak
      this.currentUserKeycloakId = userInfo.username; // ou userInfo.sub
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  }

  initForm() {
    this.biologisteForm = this.fb.group({
      keycloakUserId: [this.currentUserKeycloakId, [Validators.required]],
      nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      specialite: ['', [Validators.minLength(3)]],
      telephone: ['', [Validators.pattern(/^[0-9+\-\s()]*$/)]],
      actif: [true]
    });
  }

  onSubmit() {
    if (this.biologisteForm.invalid) {
      this.markFormGroupTouched(this.biologisteForm);
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const biologisteData: UpsertBiologisteDto = this.biologisteForm.value;

    this.biologisteService.upsertBiologiste(biologisteData).subscribe({
      next: (response) => {
        console.log('Biologiste saved:', response);
        this.successMessage = 'Biologiste créé avec succès !';

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error saving biologiste:', error);
        this.errorMessage = error.error?.message || 'Erreur lors de l\'enregistrement du biologiste';
        this.isSubmitting = false;
      }
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.biologisteForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.biologisteForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Ce champ est requis';
    if (field.errors['minlength']) {
      return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
    }
    if (field.errors['maxlength']) {
      return `Maximum ${field.errors['maxlength'].requiredLength} caractères`;
    }
    if (field.errors['pattern']) return 'Format invalide';

    return 'Champ invalide';
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
