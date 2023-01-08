import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entity/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  user : User = new User();

  isValidationFail:boolean = false;

  registerError : any = '';
  isUserNameAlreadyPresent:boolean = false;



  ngOnInit(): void {
  }

  registerUser(){

    this.isValidationFail=false;
    
    this.isUserNameAlreadyExist(this.user.userName);

  }



  public isUserNameAlreadyExist(userName: string) {

    this.userService.isUserNameAlreadyExist(userName).subscribe( response =>{   
      
      if(response){
       
        this.registerError={ validationMessage: 'UserName is already exist.!' };
        this.isValidationFail=true;
        this.router.navigate(['/register']);
        

      }else{

        this.userService.registerNewUser(this.user).subscribe( response =>{    
          const isRegister=true;
          this.router.navigate(['/login',isRegister]);
          
       },error=>{
         
          this.registerError={ validationMessage: 'Input Field should not be blank and size must be between 3 and 30' };
          this.isValidationFail=true;
          this.router.navigate(['/register']);
       } );


      }
      
   });
  
  }




}
