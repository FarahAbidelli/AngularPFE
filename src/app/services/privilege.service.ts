import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Privilege } from '../models/privilege';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  private BasicUrl='http://localhost:8085/bank/api/auth';
  constructor(private http:HttpClient) { }

  public getPrivilege(){
    return this.http.get<Privilege[]>(`${this.BasicUrl}/all`);
  }
  public getPrivilegeWithRole(roleId:number): Observable<Privilege[]> {
    return this.http.get<Privilege[]>(`${this.BasicUrl}/privilegesByRole/${roleId}`);

  }
  deletePrivilege(id:any){
    return this.http.delete<any>(`${this.BasicUrl}/deletePrivilege/${id}`);
  }
  addPrivilege(roleId:any,menuId:any): Observable<any>{
    const body = {};
    return this.http.post<Privilege>(`${this.BasicUrl}/add?roleId=${roleId}&menuId=${menuId}`,body);
  }
  getPrivilegeById(id:any){
    return this.http.get<any>(`${this.BasicUrl}/${id}?id=${id}`);
 }
 updatePrivilege(id: number, roleId: number, menuId: string, privilege: Privilege): Observable<Privilege> {
  return this.http.put<Privilege>(`${this.BasicUrl}/${id}?roleId=${roleId}&menuId=${menuId}`, privilege);
}


}
