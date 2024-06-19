import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {ExpensesService} from "../../services/expenses/expenses.service";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";

@Component({
  selector: 'app-deleteexpensedialogbox',
  standalone: true,
  imports: [
    MatDialogClose
  ],
  templateUrl: './deleteexpensedialogbox.component.html',
  styleUrl: './deleteexpensedialogbox.component.css'
})
export class DeleteexpensedialogboxComponent {

  constructor(
    private expensesService : ExpensesService,
  ) {
  }

  expenseIdToDelete : number = inject<number>(MAT_DIALOG_DATA);

  public onDeleteExpense() {

    this.expensesService.expenseDelete(this.expenseIdToDelete).subscribe(
      {
        next: (positiveResponse : PositiveResponseModel) => {

        },
        error: (errorResponse: Error) => {
          console.error(errorResponse);
        }
      }
    )
  }

}
