import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import {
  BiologisteResponseDto,
  UpsertBiologisteDto
} from '../../models/projet.model';

@Injectable({
  providedIn: 'root'
})
export class BiologisteService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.biologiste; // Via Gateway : /api/biologistes

  getAllBiologistes(): Observable<BiologisteResponseDto[]> {
    return this.http.get<BiologisteResponseDto[]>(this.apiUrl);
  }

  getBiologisteById(id: number): Observable<BiologisteResponseDto> {
    return this.http.get<BiologisteResponseDto>(`${this.apiUrl}/${id}`);
  }

  getBiologisteByKeycloakId(keycloakId: string): Observable<BiologisteResponseDto> {
    return this.http.get<BiologisteResponseDto>(`${this.apiUrl}/keycloak/${keycloakId}`);
  }

  existsByKeycloakId(keycloakId: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(
      `${this.apiUrl}/keycloak/${keycloakId}/exists`
    );
  }

  upsertBiologiste(data: UpsertBiologisteDto): Observable<BiologisteResponseDto> {
    return this.http.post<BiologisteResponseDto>(this.apiUrl, data);
  }
}
