import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogClose} from "@angular/material/dialog";
import {IncomeService} from "../../services/income/income.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {userDetailsSelector} from "../../store/selector/userDetails.selctor";
import {UserDetailsModel} from "../../models/userDetails.model";
import {IncomeCreateRequestModel} from "../../models/IncomeCreateRequest.model";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-createincomedialogbox',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './createincomedialogbox.component.html',
  styleUrl: './createincomedialogbox.component.css'
})
export class CreateincomedialogboxComponent {

  constructor(
    private incomeService : IncomeService,
    private store : Store<AppState>,
    private toastrService : ToastrService
  ) {
  }

  createIncomeForm = new FormGroup({
    incomeName : new FormControl('', [Validators.required]),
    incomeDescription : new FormControl('', [Validators.required]),
    incomeCategory : new FormControl('', [Validators.required]),
    incomeAmount : new FormControl(0, [Validators.required]),
    incomeCreatedBy : new FormControl("", [Validators.required]),
  })

  public onCreateIncome() {

    let idFromState : number = -1;
    let emailFromState : string = "";

    this.store.select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        console.log(userDetails);
        idFromState=userDetails.userId;
        emailFromState=userDetails.email;
      })

    let incomeCreateRequest : IncomeCreateRequestModel ={
      userId : idFromState,
      email : emailFromState,
      incomeName : this.createIncomeForm.value.incomeName!,
      incomeDescription : this.createIncomeForm.value.incomeDescription!,
      incomeCategory : this.createIncomeForm.value.incomeCategory!,
      incomeAmount : this.createIncomeForm.value.incomeAmount!,
      incomeCreatedBy : this.createIncomeForm.value.incomeCreatedBy!,
    }

    this.incomeService.incomeCreate(incomeCreateRequest).subscribe(
      {
        next: (positiveResponseDto : PositiveResponseModel) => {
          this.toastrService.success("Income successfully created","Success");
        },
        error: (errorResponse : Error) => {
          this.toastrService.error("Creating income is not Done","Error");
          console.log(errorResponse);
        }
      }
    )

  }

}
