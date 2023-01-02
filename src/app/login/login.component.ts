import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtRequest } from '../entity/jwt-request';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jwtRequest : JwtRequest = new JwtRequest();

  isRegister : boolean = false ;
  showError : boolean = false;

  message: string; 


  constructor(private userService:UserService,private router:Router,private activateRouter :ActivatedRoute,private authservice:AuthService) { }

  ngOnInit(): void {

    
    this.isRegister=this.activateRouter.snapshot.params['isRegister'];

    
  }

  loginUser(){

    this.userService.login(this.jwtRequest).subscribe(response => {

      this.authservice.setToken(response.jwtToken)        
      this.authservice.setRoles(response.user.role);
      this.authservice.setLoginUser(response.user);

      const roleName = response.user.role[0].roleName;
      
      if(roleName === 'Admin'){
        console.log("inside if ");
        this.router.navigate(['/admin']);
      }else{
        console.log("inside else  ");
        this.router.navigate(['/user']);        
      }
      

    },error=> {
      this.showError=true;
      this.message="You have entered an invalid username or password";
    });

  }


}
