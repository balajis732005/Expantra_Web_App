import { Routes } from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {AuthenticateComponent} from "./components/authenticate/authenticate.component";
import {RegisterComponent} from "./components/register/register.component";
import {RegisterVerifyComponent} from "./components/register-verify/register-verify.component";
import {ForgetpasswordComponent} from "./components/forgetpassword/forgetpassword.component";
import {ResetpasswordComponent} from "./components/resetpassword/resetpassword.component";
import {HomeComponent} from "./components/home/home.component";
import {UpdateComponent} from "./components/update/update.component";

export const routes: Routes = [
  {path : '', component : WelcomeComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'register-verify',component : RegisterVerifyComponent},
  {path : 'authenticate', component : AuthenticateComponent},
  {path : 'forgetpassword', component : ForgetpasswordComponent},
  {path : 'resetpassword', component : ResetpasswordComponent},
  {path : 'home', component : HomeComponent},
  {path : 'update', component : UpdateComponent}
];
