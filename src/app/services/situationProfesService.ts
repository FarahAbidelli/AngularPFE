import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { situationClientProfes } from '../models/situationClientProfes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SituationProfesService {

  private BasicUrl ='http://localhost:8085/bank/api/auth';
  constructor(private http:HttpClient) { }
  public getSituations(){
    return this.http.get<situationClientProfes[]>(`${this.BasicUrl}/ConsulterSituation`);
  }

  uploadSituations(file: File): Observable<number> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<number>(`${this.BasicUrl}/uploadSituation`, formData);
  }
  public getSituationById(id: number): Observable<situationClientProfes> {
    const url = `${this.BasicUrl}/situation/${id}`;
    return this.http.get<situationClientProfes>(url);
  }
  SearchByClientId(clientId:any){
    return this.http.get<situationClientProfes[]>(`${this.BasicUrl}/searchByClientId?clientId=${clientId}`);
   }
}
