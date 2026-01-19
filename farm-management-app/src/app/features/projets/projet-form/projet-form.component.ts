import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RequestProjetDTO, Statusprojet } from '../../../core/models/projet.model';
import { ProjetService } from '../../../core/services/api/projet';

@Component({
  selector: 'app-projet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projet-form.component.html',
  styleUrl: './projet-form.component.css'
})
export class ProjetFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private projetService = inject(ProjetService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  projetForm!: FormGroup;
  isEditMode = false;
  projetId?: number;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  // Options pour les selects
  statusOptions = [
    { value: Statusprojet.EN_COURS, label: 'En cours' },
    { value: Statusprojet.TERMINE, label: 'Terminé' },
    { value: Statusprojet.EN_ATTENTE, label: 'En attente' },
    { value: Statusprojet.PLANIFIE, label: 'Planifié' }
  ];

  ngOnInit() {
    this.initForm();
    this.checkEditMode();
  }

  initForm() {
    this.projetForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      typeCulture: ['', [Validators.required, Validators.minLength(3)]],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      statusProjet: [Statusprojet.PLANIFIE, Validators.required]
    });
  }

  checkEditMode() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.projetId = +params['id'];
        this.loadProjet();
      }
    });
  }

  loadProjet() {
    if (!this.projetId) return;

    this.projetService.getProjetById(this.projetId).subscribe({
      next: (projet) => {
        this.projetForm.patchValue({
          nom: projet.nom,
          description: projet.description,
          typeCulture: projet.typeCulture,
          dateDebut: projet.dateDebut,
          dateFin: projet.dateFin,
          statusProjet: projet.statusProjet
        });
      },
      error: (error) => {
        console.error('Error loading projet:', error);
        this.errorMessage = 'Erreur lors du chargement du projet';
      }
    });
  }

  onSubmit() {
    if (this.projetForm.invalid) {
      this.markFormGroupTouched(this.projetForm);
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const projetData: RequestProjetDTO = this.projetForm.value;

    const request$ = this.isEditMode && this.projetId
      ? this.projetService.updateProjet(this.projetId, projetData)
      : this.projetService.createProjet(projetData);

    request$.subscribe({
      next: (response) => {
        console.log('Projet saved:', response);
        this.successMessage = this.isEditMode
          ? 'Projet modifié avec succès !'
          : 'Projet créé avec succès !';

        setTimeout(() => {
          this.router.navigate(['/projets', response.idProjet]);
        }, 1500);
      },
      error: (error) => {
        console.error('Error saving projet:', error);
        this.errorMessage = 'Erreur lors de l\'enregistrement du projet';
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
    const field = this.projetForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.projetForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Ce champ est requis';
    if (field.errors['minlength']) {
      return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
    }
    if (field.errors['maxlength']) {
      return `Maximum ${field.errors['maxlength'].requiredLength} caractères`;
    }

    return 'Champ invalide';
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
