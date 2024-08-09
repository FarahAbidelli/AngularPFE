import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Score } from '../models/score';
import { Observable } from 'rxjs';
import { Variable } from '../models/variable';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private BasicUrl ='http://localhost:8085/bank/api/auth';
  constructor(private http:HttpClient) { }

  createScore(score: Score): Observable<Score> {
    return this.http.post<Score>(`${this.BasicUrl}/addScore`, score);
  }
  updateScore(scoreId: number, updatedScore: Score): Observable<Score> {
    const url = `${this.BasicUrl}/updateScore/${scoreId}`;
    return this.http.put<Score>(url, updatedScore, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public deleteScore(id: number):Observable<any>{
    return this.http.delete(`${this.BasicUrl}/deleteScore/${id}`);
  }
  calculateScore(values: string[]): Observable<number> {
    return this.http.post<number>(`${this.BasicUrl}/calculateScore`, { values });
  }
  public getAllVariables(){
    return this.http.get<Variable[]>(`${this.BasicUrl}/getAllVariables`);
  }
  public ScoreById(id: number):Observable<any>{
    return this.http.get(`${this.BasicUrl}/scores/${id}`);
  }
}
