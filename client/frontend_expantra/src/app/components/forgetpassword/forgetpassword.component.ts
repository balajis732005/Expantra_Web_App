import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ForgetPasswordService} from "../../services/ForgetPassword/forgetpassword.service";
import {ForgetPasswordEmailSendModel} from "../../models/ForgetPasswordEmailSend.model";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {VerificationRequestModel} from "../../models/VerificationRequest.model";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {

  constructor(
    private forgetpasswordService: ForgetPasswordService,
    private router: Router
  ) {
  }

  emailForm = new FormGroup({
    email : new FormControl("", [Validators.required])
  })

  otpForm = new FormGroup({
    otp : new FormControl("", [Validators.required])
  })

  public onEmail(){

    let forgetPasswordEmailSend : ForgetPasswordEmailSendModel = {
      email : this.emailForm.value.email!
    }

    this.forgetpasswordService.forgetPasswordEmailSend(forgetPasswordEmailSend).subscribe(
      {
        next : (positiveResponseDto : PositiveResponseModel) => {

        },
        error : (error : Error) => {
          console.log(error.message);
        }
      }
    )
  }

  public onOtp() {

    let forgetPasswordVerify : VerificationRequestModel = {
      verificationCode : this.otpForm.value.otp!,
      email : this.emailForm.value.email!,
    }

    this.forgetpasswordService.forgetPasswordVerify(forgetPasswordVerify).subscribe(
      {
        next : (positiveResponseDto : PositiveResponseModel) => {
          this.router.navigate(['/resetpassword'],
            {queryParams:{data:this.emailForm.value.email}})
            .then(status => true);
        },
        error : (error : Error) => {
          console.log(error.message);
        }
      }
    )
  }

}
