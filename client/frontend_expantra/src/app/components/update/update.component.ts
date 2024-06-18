import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppState} from "../../store/state/app.state";
import {Store} from "@ngrx/store";
import {UpdateRequestModel} from "../../models/UpdateRequestModel";
import {userDetailsSelector} from "../../store/selector/userDetails.selctor";
import {UserDetailsModel} from "../../models/userDetails.model";
import {UpdateAction} from "../../store/action/update.action";

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{

  constructor(
    private store : Store<AppState>
  ) {
  }

  ngOnInit() {

    this.store.select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        this.updateForm.setValue({
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          gender: userDetails.gender,
          mobileNumber: userDetails.mobileNumber,
          email: userDetails.email,
          password: ""
        })
      })

  }

  updateForm = new FormGroup({
    firstName : new FormControl("",[Validators.required]),
    lastName : new FormControl("",[Validators.required]),
    gender : new FormControl("",[Validators.required]),
    mobileNumber : new FormControl("",[Validators.required]),
    email : new FormControl("",[Validators.required,Validators.email]),
    password : new FormControl("",[Validators.required,Validators.minLength(6)]),
  })

  public onUpdate() {

    let idFromState : number;

    this.store.select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        console.log(userDetails);
        idFromState=userDetails.userId;
      })

    let updateRequestForm : UpdateRequestModel = {
      userId : idFromState!,
      firstName : this.updateForm.value.firstName!,
      lastName : this.updateForm.value.lastName!,
      gender : this.updateForm.value.gender!,
      mobileNumber : this.updateForm.value.mobileNumber!,
      email : this.updateForm.value.email!,
      password : this.updateForm.value.password!,
    }

    this.store.dispatch(UpdateAction(
      {
        updateRequest : updateRequestForm
      }
    ))

    this.store.select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        console.log("main:",userDetails);
      })

  }

}
