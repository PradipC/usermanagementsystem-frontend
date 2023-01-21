import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entity/user';
import { Page } from '../entity/page';
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
  page = new Page();

  date : Date = new Date();
  welcomeMessage : string = 'Hello';

  ngOnInit(): void {

    this.loginUser = this.authService.getLoginUser();    

  
    this.getUsersList(this.page);

    const currentHour = this.date.getHours();
    
    if (currentHour >= 6 && currentHour < 12) {
        this.welcomeMessage = 'Good morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
        this.welcomeMessage = 'Good afternoon!';
    } else {
        this.welcomeMessage = 'Good evening!';
    }
  }

  


   

    updateUser(userName:string){
      this.router.navigate(['update',userName]);
    }

    deleteUser(userName:string){
     this.userService.deleteUser(userName).subscribe(response => {
     if(this.page.number != 0){
       this.page.number=this.page.number-1;
     }else{
       this.page.number=0;
     }
     
     this.getUsersList(this.page);    
    },error => alert("Please contact Administrator"))
     
    }



    getUsersList(page : Page){
      
   
      this.userService.getUsersListWithPagination(page).subscribe(response => {
    
        this.listOfUsers = response.content; 
        this.page = response;
 
       },() => alert("Please contact Administrator"))
       
    }

  






    nextPage() {

      this.page.number++;      
      this.getUsersList(this.page);

    }
  
    previousPage() {
      this.page.number--;
      this.getUsersList(this.page);

    }
  
    hasNext() {
      return this.page.last;
    }
  
    hasPrevious() {
      return this.page.first;
    }



}

