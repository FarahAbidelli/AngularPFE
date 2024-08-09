import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SituationClientRetail } from '../models/situation-client-retail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SituationService {

  private BasicUrl ='http://localhost:8085/bank/api/auth';
  constructor(private http:HttpClient) { }
  public getSituations(){
    return this.http.get<SituationClientRetail[]>(`${this.BasicUrl}/ConsulterSituation`);
  }

  uploadSituations(file: File): Observable<number> {
    const formData = new FormData();
    formData.append('file', file);
  
    return this.http.post<number>(`${this.BasicUrl}/uploadSituation`, formData);
  }
  public getSituationById(id: number): Observable<SituationClientRetail> {
    const url = `${this.BasicUrl}/getSituationById/${id}`;
    return this.http.get<SituationClientRetail>(url);
  }
  SearchByClientId(clientId:any){
    return this.http.get<SituationClientRetail[]>(`${this.BasicUrl}/searchByClientId?clientId=${clientId}`);
   }
}
