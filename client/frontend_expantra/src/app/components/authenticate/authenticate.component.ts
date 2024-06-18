import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {AuthenticationAction} from "../../store/action/authentication.action";
import {AuthenticateRequestModel} from "../../models/AuthenticateRequest.model";
import {userDetailsSelector} from "../../store/selector/userDetails.selctor";
import {UserDetailsModel} from "../../models/userDetails.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})

export class AuthenticateComponent {

  constructor(
    private store: Store<AppState>,
  ) {
  }

  authenticateForm = new FormGroup(
    {
      email : new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    }
  )

  public onAuthenticate(){

    let authenticateFormRequest : AuthenticateRequestModel = {
      email : this.authenticateForm.value.email!,
      password : this.authenticateForm.value.password!
    }

    this.store.dispatch(AuthenticationAction({
      authenticateRequest : authenticateFormRequest
    }))

    this.store.select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        console.log(userDetails);
      })

  }

}
