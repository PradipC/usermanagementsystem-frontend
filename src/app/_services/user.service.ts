import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtRequest } from '../entity/jwt-request';
import { JwtResponse } from '../entity/jwt-response';
import { User } from '../entity/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private httpClient : HttpClient,private authService:AuthService) { }

  baseURL = "http://localhost:8080";
  UserBaseURL = this.baseURL+"/api/user";


  usersList:Observable<User[]>;


  requestHeader   = new HttpHeaders(
    { "No-Auth" : "True" }
   );



  public login(jwtRequest:JwtRequest) :  Observable<JwtResponse> {
  
    return this.httpClient.post<JwtResponse>(this.baseURL + "/authenticate",
      jwtRequest, { headers: this.requestHeader });      

  }



  public isServerReady() : Observable<boolean>{
    return  this.httpClient.get<boolean>( `${this.UserBaseURL}/ping` , { headers: this.requestHeader } );
  }


  public roleMatch(allowedRoles : any) : boolean {

    let isMatch=false;
    const userRoles : any =this.authService.getRoles();
    
   if(userRoles != null && userRoles ){
       for(let i=0;i< userRoles.length ;i++){
            for(let j=0; j < allowedRoles.length ; j++){
                if(userRoles[i].roleName === allowedRoles[j]  ){
                    isMatch = true;
                    return isMatch;
                }else{
                    return isMatch;
                }
            }
       }
   }
   return isMatch;
 }



 registerNewUser(user:User) : Observable<User>  {

  return  this.httpClient.post<User>(  `${this.UserBaseURL}/create` , user , { headers: this.requestHeader }); 

}


   public getUsersList() : Observable<User[]>{

    this.usersList = this.httpClient.get<User[]>( `${this.UserBaseURL}/get` );
    return this.usersList;
   }

   getUserByUserName(userName:string) : Observable<User>{
    return this.httpClient.get<User>( `${this.UserBaseURL}/get/${userName}` );      
 }

 


 isUserNameAlreadyExist(userName:string) : Observable<boolean>{
  return this.httpClient.get<boolean>( `${this.UserBaseURL}/validat-name/${userName}` , { headers: this.requestHeader } );      
}



 updateUser(userName:string , user:User) : Observable<User> {
    
   return this.httpClient.put<User>( `${this.UserBaseURL}/update/${userName}`, user );      
   
 }


  deleteUser(userName:string) : Observable<Object> {
   
   return this.httpClient.delete( `${this.UserBaseURL}/delete/${userName}` );

  }






}
