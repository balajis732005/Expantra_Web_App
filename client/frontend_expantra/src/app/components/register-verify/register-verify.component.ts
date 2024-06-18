import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {VerificationRequestModel} from "../../models/VerificationRequest.model";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {RegisterService} from "../../services/Register/register.service";

@Component({
  selector: 'app-register-verify',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-verify.component.html',
  styleUrl: './register-verify.component.css'
})

export class RegisterVerifyComponent implements OnInit{

  constructor(
    private activatedRouter: ActivatedRoute,
    private router : Router,
    private registerService : RegisterService,
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
          this.router.navigate(['/authenticate']).then(status => true);
        },
        error: (errorResponse : Error) => {
          console.log(errorResponse);
        }
      }
    )

  }

}
