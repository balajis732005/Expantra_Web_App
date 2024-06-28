import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterRequestModel} from "../../models/RegisterRequest.model";
import {RegisterService} from "../../services/Register/register.service";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {Router, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private registerService: RegisterService,
    private router : Router,
    private toastrService : ToastrService,
  ) {
  }

  registerForm = new FormGroup({
    firstName : new FormControl("",[Validators.required]),
    lastName : new FormControl("",[Validators.required]),
    gender : new FormControl("",[Validators.required]),
    age : new FormControl(0,[Validators.required]),
    mobileNumber : new FormControl("",[Validators.required]),
    email : new FormControl("",[Validators.required,Validators.email]),
    password : new FormControl("",[Validators.required,Validators.minLength(6)]),
    showPassword : new FormControl(false),
    role : new FormControl("",[Validators.required])
  })

  passType : string = "password";

  public onPasswordShow(){
    console.log(this.registerForm.value.showPassword);
    if(!this.registerForm.value.showPassword){
      this.passType="text";
    }else{
      this.passType="password";
    }
  }

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
          this.toastrService.success("verify Your Email with OTP","Success");
          this.router.navigate(['/register-verify'],
            {queryParams: {data: this.registerForm.value.email}}).then(status => true);
        },
        error: (errorResponse : Error) => {
          this.toastrService.error("Invalid Register Credentials","Error");
          console.log(errorResponse);
        }
      }
    )

  }

}
