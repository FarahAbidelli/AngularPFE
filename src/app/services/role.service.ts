import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from '../models/roles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private BasicUrl ='http://localhost:8085/bank/api/auth';
  constructor(private http:HttpClient) { }
  public getRoles(){
    return this.http.get<Roles[]>(`${this.BasicUrl}/getAllRoles`);
  }

  addRole(role:any){
        return this.http.post<Roles>(`${this.BasicUrl}/addRole`,role);
      } 
  public getRoleId(id: number): Observable<Roles> {
    const url = `${this.BasicUrl}/getByIdRole/${id}`;
    return this.http.get<Roles>(url);
  }

  updateRole(id:any,role:any){
    return this.http.put<Roles>(`${this.BasicUrl}/updateRole/${id}`,role);
 }
 deleteRole(id:any){
  return this.http.delete<any>(`${this.BasicUrl}/deleteRole/${id}`);
}
}
