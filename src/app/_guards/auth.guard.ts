import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,
    private userService:UserService,
    private router:Router
    ){}



  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.authService.getToken() != null ){
       
        const role =route.data["roles"] as Array<String>;

        if(role){
          const match = this.userService.roleMatch(role);
          
          if(match){
            return true;
          } else {
            this.router.navigate(["/forbidden"]);
            return false;
          } 


        }

        
    }    

     this.router.navigate(["/login"]);
      return false;
  }





}
