import {Component, OnInit} from '@angular/core';
import {ForgetPasswordService} from "../../services/ForgetPassword/forgetpassword.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ResetPasswordModel} from "../../models/ResetPassword.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent implements OnInit{

  constructor(
    private activatedRouter: ActivatedRoute,
    private router : Router,
    private forgetpasswordService: ForgetPasswordService,
  ) {
  }

  public routedResetPasswordEmail! : string;

  ngOnInit(): void {

    this.activatedRouter.queryParams.subscribe((params : any) => {
      console.log("email :",params.data);
      this.routedResetPasswordEmail=params.data;
    })

  }

  resetPasswordForm = new FormGroup({
    newPassword : new FormControl("", [Validators.required])
  })

  public onResetPassword() {

    let resetPassword : ResetPasswordModel = {
      email : this.routedResetPasswordEmail,
      newPassword : this.resetPasswordForm.value.newPassword!
    }

    this.forgetpasswordService.passwordReset(resetPassword).subscribe(
      {
        next : (positiveResponseDto : PositiveResponseModel) => {
          this.router.navigate(['/authenticate']).then(status => true);
        },
        error : (errorResponse : Error) => {
          console.log(errorResponse.message);
        }
      }
    )

  }

}
