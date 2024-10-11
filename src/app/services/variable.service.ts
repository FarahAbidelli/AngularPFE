import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Variable } from '../models/variable';
import { Observable } from 'rxjs';
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  private BasicUrl ='http://localhost:8085/bank/api/auth';
  constructor(private http:HttpClient) { }

  addVariable(variable:any,modeleId:any){
    return this.http.post<Variable>(`${this.BasicUrl}/addVariable/${modeleId}`,variable);
  }
  public getAllVariables(){
    return this.http.get<Variable[]>(`${this.BasicUrl}/getAllVariables`);
  }

  public getAllVariablesId(clientId: any){
    return this.http.get<Variable[]>(`${this.BasicUrl}/getAllVariables/${clientId}`);
  }


  public getAllVariableResponses(notationId:any){
    return this.http.get<any[]>(`${this.BasicUrl}/variableResponses/${notationId}`);
  }

  public sendResponses(responses: any,id:any){
    return this.http.post<any>(`${this.BasicUrl}/note/${id}`,responses);
  }

  public saveResponses(responses: any,id:any){
    return this.http.post<any>(`${this.BasicUrl}/notation/${id}`,responses);
  }

  public updateResponses(responses: any){
    return this.http.post<any>(`${this.BasicUrl}/note`,responses);
  }

  public getTerminated(){
    return this.http.get<any>(`${this.BasicUrl}/done`);
  }

  public getInProgress(){
    return this.http.get<any>(`${this.BasicUrl}/inProgress`);
  }

  public getVariableById(id: number): Observable<any> {

    const url = `${this.BasicUrl}/getVariableScoreById/${id}`;
    return this.http.get<any>(url);
  }
  getScoreById(scoreId: number): Observable<Score> {
    const url = `${this.BasicUrl}/scores/${scoreId}`;
    return this.http.get<Score>(url);
  }
  updateVariable(id:any,variable:any){
    return this.http.put<Variable>(`${this.BasicUrl}/updataVariable/${id}`,variable);
 }
 deleteVariable(id:any){
  return this.http.delete<any>(`${this.BasicUrl}/deleteVariable/${id}`);
}
public getVariables(){
  return this.http.get<Variable[]>(`${this.BasicUrl}`);
}
valeurPonderer(variableId: number): Observable<Variable> {
  const url = `${this.BasicUrl}/ponderation/${variableId}`;
  return this.http.get<Variable>(url);
}

public getNotationById(id: number): Observable<any> {

  const url = `${this.BasicUrl}/variableResponses/${id}`;
  return this.http.get<any>(url);
}


}
