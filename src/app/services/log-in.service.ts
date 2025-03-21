import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  AuthResponseData } from '../Model/authResponse';
import { AuthRequestData } from '../Model/authRequest';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  private apiKey = 'AIzaSyAH2Si-wfVMNKJZvStYI8XyrQmDrM_ic4c';

  user = new BehaviorSubject<User | null>( null );

  constructor(private http: HttpClient) { }

  signUp(eMail: any, passWord: any){
    const requestData: AuthRequestData = { 
      email : eMail, 
      password : passWord, 
      returnSecureToken: true,
    }
    return this.http.post<AuthResponseData>
    (`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, requestData)
    .pipe(catchError(this.handleError), tap((resp) => {
      this.handleCreatedUser(resp);
    }) )
  }

  regSignUp(userData: any, token: any){
   return this.http.post(`https://angularhttpclient-13abb-default-rtdb.firebaseio.com/User.json?auth=${token}`, userData);
  }


  logIn(eMail : any, passWord : any){
    const requestData : AuthRequestData = {
      email : eMail, 
      password : passWord, 
      returnSecureToken: true,
    }
    return this.http.post<AuthResponseData>
    (`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, requestData)
    .pipe(catchError(this.handleError), tap((resp) => {
      this.handleCreatedUser(resp);
    }) );
  }

  logOut() {
    this.user.next(null); 
    localStorage.removeItem('userData'); 
  }



  private handleCreatedUser(resp : any){
    const expriesInTs = new Date().getTime() + +resp.expiresIn * 1000;
    const expiresIn = new Date(expriesInTs);

    const user = new User(resp.email, resp.localId, resp.idToken, expiresIn );

    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify({ 
      email: resp.email, 
      id: resp.localId, 
      token: resp.idToken, 
      expiresIn: expiresIn 
    }));
  }


  private handleError(err: any){
    let errMsg = "An unknown error as occured."
    // console.log(err);
    
      if(!err.error || !err.error.error){
        return throwError(() => errMsg)
      }
      
      switch (err.error.error.message){
        case 'EMAIL_EXISTS':
          errMsg = 'The email address is already exists.'
          break;

        case 'OPERATION_NOT_ALLOWED':
          errMsg = 'Password sign-in is disabled for this project.'  
          break;

        case 'INVALID_LOGIN_CREDENTIALS':
          errMsg = 'The Gmail/Password are Invalid.'
          break; 
      }
      return throwError(() => errMsg)
  }
}
