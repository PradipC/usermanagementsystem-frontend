import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
   {path:"login",component:LoginComponent},
   {path:"login/:isRegister",component:LoginComponent},
   {path:"admin",component:AdminComponent,canActivate:[AuthGuard],data:{roles:['Admin']}  },
   { path: 'user', component: UserComponent , canActivate:[AuthGuard],data:{roles:['User']}},
   {path:"home",component:HomeComponent},
   {path:"",redirectTo:"home",pathMatch:"full"},
   {path:"forbidden",component:ForbiddenComponent},
   {path:"register",component:RegisterComponent },
   {path:"update/:userName",component:UpdateComponent},
   {path:"about", component:AboutComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
