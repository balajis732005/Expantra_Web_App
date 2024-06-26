import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {VerificationRequestModel} from "../../models/VerificationRequest.model";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {RegisterService} from "../../services/Register/register.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-verify',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './register-verify.component.html',
  styleUrl: './register-verify.component.css'
})

export class RegisterVerifyComponent implements OnInit{

  constructor(
    private activatedRouter: ActivatedRoute,
    private router : Router,
    private registerService : RegisterService,
    private toastrService : ToastrService
  ) {
  }

  public routedRegistrationEmail! : string;

  ngOnInit(): void {

    this.activatedRouter.queryParams.subscribe((params : any) => {
      console.log("email :",params.data);
      this.routedRegistrationEmail=params.data;
    })

  }

  registerVerifyForm = new FormGroup({
    activationCode : new FormControl("",[Validators.required])
  })

  public onRegisterVerify() {

    let verificationRequest : VerificationRequestModel = {
      email : this.routedRegistrationEmail,
      verificationCode : this.registerVerifyForm.value.activationCode!
    }
    console.log("params",verificationRequest);

    this.registerService.verifyRegisterActivationCode(verificationRequest).subscribe(
      {
        next: (positiveResponse : PositiveResponseModel) => {
          this.toastrService.success("Registration Process Completed Successfully","Success");
          this.router.navigate(['/authenticate']).then(status => true);
        },
        error: (errorResponse : Error) => {
          this.toastrService.error("Invalid Verification Code or Credentials","Error");
          console.log(errorResponse);
        }
      }
    )

  }

}
