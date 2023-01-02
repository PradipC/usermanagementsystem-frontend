import { Injectable } from '@angular/core';
import { Role } from '../entity/role';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public setRoles(roles:Role[]){
    localStorage.setItem('roles', JSON.stringify (roles));
  }

  public getRoles() : [] {
    return  JSON.parse(localStorage.getItem('roles') || '{}' ) ;
  }

  public setToken(jwtToken:string){
    localStorage.setItem('jwtToken',jwtToken);
  }


  public setLoginUser(user : User){
    localStorage.setItem('loginUser', JSON.stringify (user));
  }

  public getLoginUser(){
    return  JSON.parse(localStorage.getItem('loginUser') || '{}' ) ;
  }


  public getToken() : string {
    return localStorage.getItem('jwtToken') as string;
  }

  
  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }


  


}
