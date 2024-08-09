import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  private BasicUrl ='http://localhost:8085/bank/api/auth';
  constructor(private http:HttpClient) { }
  public getClients(){
    return this.http.get<Client[]>(`${this.BasicUrl}/getAllClients`);
  }
  public getClientId(id: number): Observable<Client> {
    const url = `${this.BasicUrl}/getClientById/${id}`;
    return this.http.get<Client>(url);
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
    return this.http.put<Client>(`${this.BasicUrl}/updateClient/${id}`,client);
 }
 SearchByCodeRelation(codeRelation:any){
  return this.http.get<Client[]>(`${this.BasicUrl}/findByCodeRelation?codeRelation=${codeRelation}`);
 }
}
