import { HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenstorageService } from './tokenstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService {

  TOKEN_HEADER_KEY='Authorization';

  constructor(private tokenservice: TokenstorageService) { }

  intercept(req: HttpRequest<any>, next:HttpHandler):Observable<any>{

    let authreq = req;

    const token = this.tokenservice.getToken();
    if(token != null){
      authreq = req.clone({headers:req.headers.set(this.TOKEN_HEADER_KEY, 'Bearer '+token)});
    }
    return next.handle(authreq);
  }

}

export const authInterceptorProvider = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorService, multi: true}
];
  