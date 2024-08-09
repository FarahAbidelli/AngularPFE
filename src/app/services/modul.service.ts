import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modul } from '../models/modul';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulService {

  private BasicUrl ='http://localhost:8085/bank/api/auth/getAllModul';
  constructor(private http:HttpClient) { }
  public getModules(){
    return this.http.get<Modul[]>(`${this.BasicUrl}`);
  }
  private url='http://localhost:8085/bank/api/auth'
  public getByCdModul(cdModul: String): Observable<Modul> {
    const Url = `${this.url}/getByCodModule/${cdModul}`;
    return this.http.get<Modul>(Url);
  }
  updateModule(cdModul:any,module:any){
    return this.http.put<Modul>(`${this.url}/updateModule/${cdModul}`,module);
 }
 deleteModule(cdModul:any){
  return this.http.delete<any>(`${this.url}/deleteCodModule/${cdModul}`);
}
addModule(modul:any){
  return this.http.post<Modul>(`${this.url}/addModule`,modul);
} 
}
