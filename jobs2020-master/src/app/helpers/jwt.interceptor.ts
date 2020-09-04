import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    currentUser: User;

    constructor(private authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        this.currentUser= this.authenticationService.currentUserValue;
       /* if (this.currentUser && this.currentUser.token) {
           
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${this.currentUser.token}`,
                    'Access-Control-Allow-Origin':'*',
                }
            });
        }*/
       
        return next.handle(request);
    }
}