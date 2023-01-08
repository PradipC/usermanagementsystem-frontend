import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entity/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authService:AuthService,
    private userService:UserService,
    private router : Router) { }

  listOfUsers : User[];
  
  loginUser : User;

  date : Date = new Date();
  welcomeMessage : string = 'Hello';

  ngOnInit(): void {

    this.loginUser = this.authService.getLoginUser();    

    this.getUsers();

    const currentHour = this.date.getHours();
    
    if (currentHour >= 6 && currentHour < 12) {
        this.welcomeMessage = 'Good morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
        this.welcomeMessage = 'Good afternoon!';
    } else {
        this.welcomeMessage = 'Good evening!';
    }
  }

  
  public getUsers(){
    this.userService.getUsersList().subscribe( response => {  
      
      this.listOfUsers=response;
    },(error) => {
       //alert("Please contact Administrator..");
    });
  }


   

    updateUser(userName:string){
      this.router.navigate(['update',userName]);
    }

    deleteUser(userName:string){
     this.userService.deleteUser(userName).subscribe(response => {
         this.getUsers();     
     },error => alert("Please contact Administrator"))
     
    }



}
