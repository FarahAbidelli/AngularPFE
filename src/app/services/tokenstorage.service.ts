import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenstorageService {
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';
  ROLES_KEY = 'auth-roles' ;

  constructor() { }

  signOut(){
    window.sessionStorage.clear();
  }
  public saveToken(token : string){
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY,token);
  }
  public saveUser(user:any){
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY,user);
  }
  public getToken():any{
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
  public getUser(){
    return JSON.parse(sessionStorage.getItem(this.USER_KEY)!);
  }
  clean(): void {
    window.localStorage.clear();
  }
  public getRoles(): string[] {
    const user = this.getUser();
    return user && user.role ? user.role : [];
  }
}
