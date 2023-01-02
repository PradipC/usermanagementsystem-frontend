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

  

  ngOnInit(): void {

    this.userName=this.activateRoute.snapshot.params['userName'];
    this.userService.getUserByUserName(this.userName).subscribe(response=>{
        this.user=response;
    },error => alert("Please contact Administrator ")
    );
   

  }

  updateUser(){

    this.userService.updateUser(this.userName,this.user).subscribe(response=>{
      response = this.user;
      this.getAllUsers();

  },error => alert("Please contact Administrator "));


  }


  private getAllUsers(){
    this.router.navigate(["admin"]);
  }



}
