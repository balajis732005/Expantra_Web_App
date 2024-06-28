import {Component, OnInit} from '@angular/core';
import {ForgetPasswordService} from "../../services/ForgetPassword/forgetpassword.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ResetPasswordModel} from "../../models/ResetPassword.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-resetpassword',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent implements OnInit{

  constructor(
    private activatedRouter: ActivatedRoute,
    private router : Router,
    private forgetpasswordService: ForgetPasswordService,
    private toastrService : ToastrService
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
    newPassword : new FormControl("", [Validators.required]),
    showPassword : new FormControl(false)
  })

  passType : string = "password";

  public onPasswordShow(){
    console.log(this.resetPasswordForm.value.showPassword);
    if(!this.resetPasswordForm.value.showPassword){
      this.passType="text";
    }else{
      this.passType="password";
    }
  }

  public onResetPassword() {

    let resetPassword : ResetPasswordModel = {
      email : this.routedResetPasswordEmail,
      newPassword : this.resetPasswordForm.value.newPassword!
    }

    this.forgetpasswordService.passwordReset(resetPassword).subscribe(
      {
        next : (positiveResponseDto : PositiveResponseModel) => {
          this.toastrService.success("Password Changed Successfully","Success");
          this.router.navigate(['/authenticate']).then(status => true);
        },
        error : (errorResponse : Error) => {
          this.toastrService.error("Reset Password Process Failed","Error");
          console.log(errorResponse.message);
        }
      }
    )

  }

}
