import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../entity/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private userService:UserService, private activateRoute: ActivatedRoute,private router:Router) { }

  userName: string; 
  user:User=new User();
  showError : boolean = false;
  message: string; 

  

  ngOnInit(): void {

    this.userName=this.activateRoute.snapshot.params['userName'];
    this.userService.getUserByUserName(this.userName).subscribe(response=>{
        this.user=response;
    },error => {
      this.showError=true;
      this.message="Something went wrong , Please contact administrator!";
    }
    );
   

  }

  updateUser(){

    this.userService.updateUser(this.userName,this.user).subscribe(response=>{
      response = this.user;
      this.getAllUsers();

  },error => {
    this.showError=true;
    this.message="Input Field should not be blank and size must be between 3 and 30";

  });


  }


  private getAllUsers(){
    this.router.navigate(["admin"]);
  }



}
