import { Component, OnInit } from '@angular/core';
import { User } from '../entity/user';
import { AuthService } from '../_services/auth.service';
import { UtilService } from '../_services/util.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private authService:AuthService,private utilService:UtilService) { }

  welcomeMessage : string = 'Hello';

  loginUser : User = new User();

  ngOnInit(): void {
      this.loginUser=this.authService.getLoginUser(); 
     
      this.welcomeMessage = this.utilService.getGreetingMessage();

  }

}
