import { Component, OnInit } from '@angular/core';
import { User } from '../entity/user';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private authService:AuthService) { }

  date : Date = new Date();

  welcomeMessage : string = 'Hello';

  loginUser : User = new User();

  ngOnInit(): void {
      this.loginUser=this.authService.getLoginUser(); 
    

      const currentHour = this.date.getHours();
      
      if (currentHour >= 6 && currentHour < 12) {
          this.welcomeMessage = 'Good morning!';
      } else if (currentHour >= 12 && currentHour < 18) {
          this.welcomeMessage = 'Good afternoon!';
      } else {
          this.welcomeMessage = 'Good evening!';
      }

  }

}
