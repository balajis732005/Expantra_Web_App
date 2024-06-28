import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {IncomeService} from "../../services/income/income.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {IncomeReadResponseModel} from "../../models/IncomeReadResponse.model";
import {userDetailsSelector} from "../../store/selector/userDetails.selctor";
import {UserDetailsModel} from "../../models/userDetails.model";
import {IncomeUpdateRequestModel} from "../../models/IncomeUpdateRequest.model";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-updateincomedialogbox',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './updateincomedialogbox.component.html',
  styleUrl: './updateincomedialogbox.component.css'
})
export class UpdateincomedialogboxComponent implements OnInit{

  constructor(
    private incomeService : IncomeService,
    private store : Store<AppState>,
    private toastrService : ToastrService
  ) {
  }

  incomeIdToUpdate! : number;

  tobeUpdateIncome : IncomeReadResponseModel = inject<IncomeReadResponseModel>(MAT_DIALOG_DATA);

  ngOnInit() {

    this.incomeIdToUpdate=this.tobeUpdateIncome.incomeId;

    this.incomeUpdateForm.setValue({
      incomeName : this.tobeUpdateIncome.incomeName,
      incomeDescription: this.tobeUpdateIncome.incomeDescription,
      incomeCategory: this.tobeUpdateIncome.incomeCategory,
      incomeAmount: this.tobeUpdateIncome.incomeAmount,
      incomeCreatedBy: this.tobeUpdateIncome.incomeCreatedBy
    })
  }

  incomeUpdateForm =  new FormGroup({
    incomeName : new FormControl("",[Validators.required]),
    incomeDescription : new FormControl("",[Validators.required]),
    incomeCategory : new FormControl("",[Validators.required]),
    incomeAmount : new FormControl(0,[Validators.required]),
    incomeCreatedBy : new FormControl("",[Validators.required]),
  })

  public onUpdateIncome() {

    let idFromState : number=-1;

    this.store.select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        console.log(userDetails);
        idFromState=userDetails.userId;
      })

    let incomeToUpdate : IncomeUpdateRequestModel = {
      incomeId : this.incomeIdToUpdate,
      incomeName : this.incomeUpdateForm.value.incomeName!,
      incomeDescription : this.incomeUpdateForm.value.incomeDescription!,
      incomeCategory : this.incomeUpdateForm.value.incomeCategory!,
      incomeAmount : this.incomeUpdateForm.value.incomeAmount!,
      incomeCreatedBy : this.incomeUpdateForm.value.incomeCreatedBy!,
      userId : idFromState
    }

    this.incomeService.incomeUpdate(incomeToUpdate).subscribe(
      {
        next: (positiveResponse : PositiveResponseModel) => {
          this.toastrService.success("Updated Successfully Click Submit Button to view Updated income","Success");
        },
        error: (errorResponse : Error) => {
          this.toastrService.error("Error in updating the Income","Error");
          console.log(errorResponse);
        }
      }
    )
  }


}
