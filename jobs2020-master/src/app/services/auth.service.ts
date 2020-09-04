import { Injectable,Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public  basUrl:String;

  constructor(private http: HttpClient) {

        this.basUrl='http://localhost:3000/users';

        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
     
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {

  
     return this.http.post<any>(this.basUrl+`/login`, { email, password })
        .pipe(map(user => {


            if (user && user.token) {
            
                localStorage.setItem('currentUser', JSON.stringify(user));
              
               this.currentUserSubject.next(user);
                
            }

            return user
         
        }));
}

createUser(user: User) {
  return this.http.post<any>(this.basUrl+`/register`, user)
  .pipe(map(user => {
      return user;
  }));
}


logout() {
  
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}


}


