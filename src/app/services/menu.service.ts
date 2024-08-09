import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private BasicUrl ='http://localhost:8085/bank/api/auth/admin/dashboard';
  constructor(private http:HttpClient) { }
  public getMenus(){
    return this.http.get<Menu[]>(`${this.BasicUrl}`);
  }
  public getModuls(){
    return this.http.get<any[]>(`${this.url}/getAllModul`);
  }
  private url='http://localhost:8085/bank/api/auth';
  addMenu(menu:any){
    return this.http.post<Menu>(`${this.url}/addMenu`,menu);
  } 
  public getAllMenus(){
    return this.http.get<Menu[]>(`${this.url}/getAllMenus`);
  }
  deleteMenu(cdMenu:any){
    return this.http.delete<any>(`${this.url}/deleteMenue/${cdMenu}`);
  }
  public getByCdMenu(cdMenu: String): Observable<Menu> {
    const url = `${this.url}/getByCodMenu/${cdMenu}`;
    return this.http.get<Menu>(url);
  }
  updateMenu(cdMenu:any,menu:any){
    return this.http.put<Menu>(`${this.url}/updateMenue/${cdMenu}`,menu);
 }
}
