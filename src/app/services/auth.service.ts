import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient ) {}


  login(credentials:any): Observable<User>{
    return this.http.post<User>('http://localhost:3200/api/login', credentials);
  }
}
