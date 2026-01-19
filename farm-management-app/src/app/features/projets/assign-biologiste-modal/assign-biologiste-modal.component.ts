import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { BiologisteResponseDto, RequestAffectationDTO } from '../../../core/models/projet.model';
import {ProjetService} from '../../../core/services/api/projet';
import {BiologisteService} from '../../../core/services/api/biologiste';

@Component({
  selector: 'app-assign-biologiste-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './assign-biologiste-modal.component.html',
  styleUrl: './assign-biologiste-modal.component.css'
})
export class AssignBiologisteModalComponent implements OnInit {
  @Input() projetId!: number;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private projetService = inject(ProjetService);
  private biologisteService = inject(BiologisteService);

  assignForm!: FormGroup;
  biologistes: BiologisteResponseDto[] = [];
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';

  ngOnInit() {
    this.initForm();
    this.loadBiologistes();
  }

  initForm() {
    this.assignForm = this.fb.group({
      biologisteId: ['', Validators.required],
      roleDansProjet: ['', [Validators.required, Validators.minLength(3)]],
      dateAffectation: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  loadBiologistes() {
    this.biologisteService.getAllBiologistes().subscribe({
      next: (biologistes) => {
        this.biologistes = biologistes.filter(b => b.actif);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading biologistes:', error);
        this.errorMessage = 'Erreur lors du chargement des biologistes';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.assignForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formValue = this.assignForm.value;

    // Trouver le biologiste sélectionné pour obtenir son keycloakUserId
    const selectedBiologiste = this.biologistes.find(
      b => b.id.toString() === formValue.biologisteId
    );

    if (!selectedBiologiste) {
      this.errorMessage = 'Biologiste non trouvé';
      this.isSubmitting = false;
      return;
    }

    const affectation: RequestAffectationDTO = {
      biologisteId: selectedBiologiste.keycloakUserId, // ✅ Utiliser keycloakUserId
      roleDansProjet: formValue.roleDansProjet,
      dateAffectation: formValue.dateAffectation
    };

    this.projetService.affecterBiologiste(this.projetId, affectation).subscribe({
      next: (response) => {
        console.log('Biologiste affecté:', response);
        this.success.emit();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error assigning biologiste:', error);
        this.errorMessage = error.error?.message || 'Erreur lors de l\'affectation';
        this.isSubmitting = false;
      }
    });
  }

  closeModal() {
    this.close.emit();
    this.assignForm.reset();
    this.isSubmitting = false;
    this.errorMessage = '';
  }
}
