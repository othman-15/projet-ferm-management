import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import {
  ResponseProjetDTO,
  RequestProjetDTO,
  ProjetDetailDTO,
  RequestAffectationDTO,
  ResponseAffectationDTO
} from '../../models/projet.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.projet + '/v1/projets'; // Via Gateway

  getAllProjets(): Observable<ResponseProjetDTO[]> {
    return this.http.get<ResponseProjetDTO[]>(this.apiUrl);
  }

  getProjetById(id: number): Observable<ResponseProjetDTO> {
    return this.http.get<ResponseProjetDTO>(`${this.apiUrl}/${id}`);
  }

  getProjetDetail(id: number): Observable<ProjetDetailDTO> {
    return this.http.get<ProjetDetailDTO>(`${this.apiUrl}/details/${id}`);
  }

  createProjet(projet: RequestProjetDTO): Observable<ResponseProjetDTO> {
    return this.http.post<ResponseProjetDTO>(this.apiUrl, projet);
  }

  updateProjet(id: number, projet: RequestProjetDTO): Observable<ResponseProjetDTO> {
    return this.http.put<ResponseProjetDTO>(`${this.apiUrl}/${id}`, projet);
  }

  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  affecterBiologiste(
    projetId: number,
    affectation: RequestAffectationDTO
  ): Observable<ResponseAffectationDTO> {
    return this.http.post<ResponseAffectationDTO>(
      `${this.apiUrl}/${projetId}/biologistes`,
      affectation
    );
  }
}
