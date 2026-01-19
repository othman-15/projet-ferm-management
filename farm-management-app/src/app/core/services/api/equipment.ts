import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import {
  RequestEquipmentDto,
  ResponseEquipmentDto,
  RequestCapteurDto,
  ResponseCapteurDto
} from '../../models/projet.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.equipment + '/v1/equipments'; // Via Gateway

  createEquipment(dto: RequestEquipmentDto): Observable<ResponseEquipmentDto> {
    return this.http.post<ResponseEquipmentDto>(this.apiUrl, dto);
  }

  getAllEquipments(): Observable<ResponseEquipmentDto[]> {
    return this.http.get<ResponseEquipmentDto[]>(this.apiUrl);
  }

  getEquipmentById(id: number): Observable<ResponseEquipmentDto> {
    return this.http.get<ResponseEquipmentDto>(`${this.apiUrl}/${id}`);
  }

  getEquipmentsByProjet(projetId: number): Observable<ResponseEquipmentDto[]> {
    return this.http.get<ResponseEquipmentDto[]>(`${this.apiUrl}/projet/${projetId}`);
  }

  deleteEquipment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addCapteur(equipmentId: number, dto: RequestCapteurDto): Observable<ResponseCapteurDto> {
    return this.http.post<ResponseCapteurDto>(
      `${this.apiUrl}/${equipmentId}/capteurs`,
      dto
    );
  }

  getCapteursByEquipment(equipmentId: number): Observable<ResponseCapteurDto[]> {
    return this.http.get<ResponseCapteurDto[]>(
      `${this.apiUrl}/${equipmentId}/capteurs`
    );
  }

  getCapteurById(capteurId: number): Observable<ResponseCapteurDto> {
    return this.http.get<ResponseCapteurDto>(
      `${this.apiUrl}/capteurs/${capteurId}`
    );
  }

  removeCapteur(equipmentId: number, capteurId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${equipmentId}/capteurs/${capteurId}`
    );
  }
}
