import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) { }

  login(username:string, password:string){
    return this.http.post<{token:string}>(`${environment.apiUrl}/login`,
    {
      username,
      password
    })
  }

  setToken(token:string){
    localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(){
    return !!this.getToken();
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Incorrect Username or Password';  //'An unknown error occured!';
      if (!errorRes.error || !errorRes.error.error) {
        return errorMessage;
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already'
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.'
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'Incorrect Username or Password'
            break;
      }
      return errorMessage;
  }
}
