import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExpensesService} from "../../services/expenses/expenses.service";
import {ExpensesCreateRequestModel} from "../../models/ExpensesCreateRequest.model";
import {userDetailsSelector} from "../../store/selector/userDetails.selctor";
import {UserDetailsModel} from "../../models/userDetails.model";
import {AppState} from "../../store/state/app.state";
import {Store} from "@ngrx/store";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {MatDialogClose} from "@angular/material/dialog";

@Component({
  selector: 'app-createexpensedialogbox',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './createexpensedialogbox.component.html',
  styleUrl: './createexpensedialogbox.component.css'
})

export class CreateexpensedialogboxComponent {

  constructor(
    private expenseService : ExpensesService,
    private store : Store<AppState>
  ) {
  }

  createExpenseForm = new FormGroup({
    expenseName : new FormControl('', [Validators.required]),
    expenseDescription : new FormControl('', [Validators.required]),
    expenseCategory : new FormControl('', [Validators.required]),
    expenseAmount : new FormControl(0, [Validators.required]),
    expenseCreatedBy : new FormControl("", [Validators.required]),
  })

  public onCreateExpense() {

    let idFromState : number = -1;
    let emailFromState : string = "";

    this.store.select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        console.log(userDetails);
        idFromState=userDetails.userId;
      })

    let expenseCreateRequest : ExpensesCreateRequestModel ={
      userId : idFromState,
      email : emailFromState,
      expenseName : this.createExpenseForm.value.expenseName!,
      expenseDescription : this.createExpenseForm.value.expenseDescription!,
      expenseCategory : this.createExpenseForm.value.expenseCategory!,
      expenseAmount : this.createExpenseForm.value.expenseAmount!,
      expenseCreatedBy : this.createExpenseForm.value.expenseCreatedBy!,
    }

    this.expenseService.expenseCreate(expenseCreateRequest).subscribe(
      {
        next: (positiveResponseDto : PositiveResponseModel) => {

        },
        error: (errorResponse : Error) => {
          console.log(errorResponse);
        }
      }
    )

  }

}
