import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modele } from '../models/modele';
import { Observable } from 'rxjs';
import { Variable } from '../models/variable';


@Injectable({
  providedIn: 'root'
})
export class ModeleService {

  private BasicUrl ='http://localhost:8085/bank/api/auth';
  constructor(private http:HttpClient) { }
  public getModeles(){
    return this.http.get<Modele[]>(`${this.BasicUrl}/ModelsSoftDeletedTrue`);
  }

  addModele(modele:any){
      return this.http.post<Modele>(`${this.BasicUrl}/addModele`,modele);
    }

  public getModeleById(id: number): Observable<Modele> {
    const url = `${this.BasicUrl}/getModeleById/${id}`;
    return this.http.get<Modele>(url);
  }
  getVariableById(id: number): Observable<Variable> {
    return this.http.get<Variable>(`${this.BasicUrl}/getVariableById/${id}`);
  }

  restoreModele(id: number): Observable<any> {
    const url = `${this.BasicUrl}/restoreModele/${id}`;
    return this.http.put(url, null);
  }
  updateModel(id:any,modele:any){
    return this.http.put<Modele>(`${this.BasicUrl}/updateModele/${id}`,modele);
 }
 deleteModele(id:any){
  return this.http.delete<any>(`${this.BasicUrl}/softDeleteModel/${id}`);
}
public getSoftDeleteModels(){
  return this.http.get<Modele[]>(`${this.BasicUrl}/ModelsSoftDeleted`);
}
ModeleUsed(id: number): Observable<Modele> {
  return this.http.put<Modele>(`${this.BasicUrl}/${id}/ModeleUsed`, null);
}
SearchByNameAndAnnee(name:any,annee:any){
  return this.http.get<Modele[]>(`${this.BasicUrl}/searchByNameAndAnnee?name=${name}&annee=${annee}`);
 }
 valeurPonderer(modeleId: number): Observable<Modele> {
  const url = `${this.BasicUrl}/ponderationModele/${modeleId}`;
  return this.http.get<Modele>(url);
}
}
