import {Component, inject, OnInit} from '@angular/core';
import {ExpensesReadResponseModel} from "../../models/ExpensesReadResponse.model";
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExpensesService} from "../../services/expenses/expenses.service";
import {ExpensesUpdateRequestModel} from "../../models/ExpensesUpdateRequest.model";
import {userDetailsSelector} from "../../store/selector/userDetails.selctor";
import {UserDetailsModel} from "../../models/userDetails.model";
import {AppState} from "../../store/state/app.state";
import {Store} from "@ngrx/store";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-updateexpensedialogbox',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './updateexpensedialogbox.component.html',
  styleUrl: './updateexpensedialogbox.component.css'
})
export class UpdateexpensedialogboxComponent implements OnInit{

  constructor(
    private expensesService : ExpensesService,
    private store : Store<AppState>,
    private toastrService : ToastrService
  ) {
  }

  expenseIdToUpdate! : number;

  tobeUpdateExpense : ExpensesReadResponseModel = inject<ExpensesReadResponseModel>(MAT_DIALOG_DATA);

  ngOnInit() {

    this.expenseIdToUpdate=this.tobeUpdateExpense.expenseId;

    this.expenseUpdateForm.setValue({
      expenseName : this.tobeUpdateExpense.expenseName,
      expenseDescription: this.tobeUpdateExpense.expenseDescription,
      expenseCategory: this.tobeUpdateExpense.expenseCategory,
      expenseAmount: this.tobeUpdateExpense.expenseAmount,
      expenseCreatedBy: this.tobeUpdateExpense.expenseCreatedBy
    })
  }

  expenseUpdateForm =  new FormGroup({
    expenseName : new FormControl("",[Validators.required]),
    expenseDescription : new FormControl("",[Validators.required]),
    expenseCategory : new FormControl("",[Validators.required]),
    expenseAmount : new FormControl(0,[Validators.required]),
    expenseCreatedBy : new FormControl("",[Validators.required]),
  })

  public onUpdateExpense() {

    let idFromState : number=-1;

    this.store.select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        console.log(userDetails);
        idFromState=userDetails.userId;
      })

    let expenseToUpdate : ExpensesUpdateRequestModel = {
      expenseId : this.expenseIdToUpdate,
      expenseName : this.expenseUpdateForm.value.expenseName!,
      expenseDescription : this.expenseUpdateForm.value.expenseDescription!,
      expenseCategory : this.expenseUpdateForm.value.expenseCategory!,
      expenseAmount : this.expenseUpdateForm.value.expenseAmount!,
      expenseCreatedBy : this.expenseUpdateForm.value.expenseCreatedBy!,
      userId : idFromState
    }

    this.expensesService.expenseUpdate(expenseToUpdate).subscribe(
      {
        next: (positiveResponse : PositiveResponseModel) => {
          this.toastrService.success("Updated Successfully Click Submit Button to view Updated Expenses","Success");
        },
        error: (errorResponse : Error) => {
          this.toastrService.error("Error in updating the Expense","Error");
          console.log(errorResponse);
        }
      }
    )
  }

}
