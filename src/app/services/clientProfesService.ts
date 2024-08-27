import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ClientProfes} from '../models/clientProfes';

@Injectable({
  providedIn: 'root'
})
export class ClientProfesService {
  private BasicUrl ='http://localhost:8085/bank/api/auth';
  constructor(private http:HttpClient) { }
  public getClients(){
    return this.http.get<ClientProfes[]>(`${this.BasicUrl}/getAllClients`);
  }
  public getClientId(id: number): Observable<ClientProfes> {
    const url = `${this.BasicUrl}/getClientById/${id}`;
    return this.http.get<ClientProfes>(url);
  }
  public deleteClient(id: number):Observable<any>{
    return this.http.delete(`${this.BasicUrl}/deleteClient/${id}`);
  }

  uploadClients(file: File): Observable<number> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<number>(`${this.BasicUrl}/uploadClient`, formData);
  }
  updateClient(id:any,client:any){
    return this.http.put<ClientProfes>(`${this.BasicUrl}/updateClient/${id}`,client);
 }
 SearchByCodeRelation(codeRelation:any){
  return this.http.get<ClientProfes[]>(`${this.BasicUrl}/findByCodeRelation?codeRelation=${codeRelation}`);
 }


  // Enregistrer une notation
  saveNotation(clientId: number, score: number, status: string): Observable<any> {
    return this.http.post(`${this.BasicUrl}/notations`, { clientId, score, status });
  }

  // Récupérer les notations en cours
  getNotationsEnCours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BasicUrl}/notations?status=en cours`);
  }

  // Récupérer les notations finalisées
  getNotationsFinalisees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BasicUrl}/notations?status=finalise`);
  }
}
