import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenstorageService } from './tokenstorage.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Roles } from '../models/roles';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // gérer les tokens
  helper=new JwtHelperService()
  role=''
  private url = 'http://localhost:8085/bank/api/auth'
  // pour connaître l'état d'authentification de l'utilisateur
  AuthenticatedUser$  = new BehaviorSubject<User | null>(null);
  constructor(private http:HttpClient, private tokenstorageService : TokenstorageService,private router: Router) {
   }
  login(forms:any):Observable<any>{
    return this.http.post(this.url+'/signin',
    {username:forms.username,password:forms.password});
  }
  register(forms:any):Observable<any>{
    return this.http.post(this.url+'/signup',
    {username:forms.username,fullname:forms.fullname,email:forms.email,phone:forms.phone,password:forms.password});
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout(){
    this.tokenstorageService.signOut();
    this.router.navigate(['/login']);

  }
  getToken(){
    this.tokenstorageService.getToken();
  }
  private Url ='http://localhost:8085/bank/api/auth'
  public getUserRole(id:number): Observable<User>{
    const url= `${this.Url}/userRole/${id}`;
    return this.http.get<User>(url);
  }

  LoggedIn(){
    let token:any=localStorage.getItem('token')
    if(!token){
     return false
    }
    let decodeToken=this.helper.decodeToken(token)


   if(decodeToken.role!=='Admin'){
      return false
    }

    if(this.helper.isTokenExpired(token)){
      return false
    }

    return true
 }
 getRole(): Roles | null {
  const user = this.tokenstorageService.getUser();
  if (user && user.role) {
    return user.role as Roles;
  }
  return null;
}
hasAccess(role: Roles): boolean {
  const userRole = this.getRole();
  if (userRole) {
    return userRole === role;
  }
  return false;
}
}
