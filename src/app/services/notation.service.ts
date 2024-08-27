// src/app/services/notation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notation } from '../models/notation';

@Injectable({
  providedIn: 'root'
})
export class NotationService {
  private apiUrl = 'http://localhost:8085/bank/api/auth/variables'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les notations
  getAllNotations(): Observable<Notation[]> {
    return this.http.get<Notation[]>(this.apiUrl);
  }

  // Récupérer une notation par ID
  getNotationById(id: number): Observable<Notation> {
    return this.http.get<Notation>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle notation
  createNotation(notation: Notation): Observable<Notation> {
    return this.http.post<Notation>(this.apiUrl, notation);
  }

  // Mettre à jour une notation
  updateNotation(notation: Notation): Observable<Notation> {
    return this.http.put<Notation>(`${this.apiUrl}/${notation.id}`, notation);
  }

  // Supprimer une notation
  deleteNotation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Filtrer les notations par statut
  getNotationsByStatus(status: string): Observable<Notation[]> {
    return this.http.get<Notation[]>(`${this.apiUrl}?status=${status}`);
  }


}
