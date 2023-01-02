import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService,private userService:UserService ,private router:Router) { }

  ngOnInit(): void {
  }

  public isLoggedIn()  {
    return this.authService.isLoggedIn();
  }

  public logout(){
    this.authService.clear();
    this.router.navigate(["/home"]);
  }

  public isRoleMatch(role:any){
    return this.userService.roleMatch(role);
  }



}
