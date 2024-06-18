import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterRequestModel} from "../../models/RegisterRequest.model";
import {RegisterService} from "../../services/Register/register.service";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private registerService: RegisterService,
    private router : Router
  ) {
  }

  registerForm = new FormGroup({
    firstName : new FormControl("",[Validators.required]),
    lastName : new FormControl("",[Validators.required]),
    gender : new FormControl("",[Validators.required]),
    age : new FormControl(-1,[Validators.required]),
    mobileNumber : new FormControl("",[Validators.required]),
    email : new FormControl("",[Validators.required,Validators.email]),
    password : new FormControl("",[Validators.required,Validators.minLength(6)]),
    role : new FormControl("",[Validators.required])
  })

  public onRegister(){

    let registerRequest : RegisterRequestModel = {
      firstName : this.registerForm.value.firstName!,
      lastName : this.registerForm.value.lastName!,
      gender : this.registerForm.value.gender!,
      age : this.registerForm.value.age!,
      mobileNumber : this.registerForm.value.mobileNumber!,
      email : this.registerForm.value.email!,
      password : this.registerForm.value.password!,
      role : this.registerForm.value.role!
    }

    this.registerService.registerUser(registerRequest).subscribe(
      {
        next : (positiveResponseDto : PositiveResponseModel) => {
          this.router.navigate(['/register-verify'],
            {queryParams: {data: this.registerForm.value.email}}).then(status => true);
        },
        error: (errorResponse : Error) => {
          console.log(errorResponse.message);
        }
      }
    )

  }

}