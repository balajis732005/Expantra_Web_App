import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {ExpensesService} from "../../services/expenses/expenses.service";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {ToastrService} from "ngx-toastr";

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
    private toastrService : ToastrService
  ) {
  }

  expenseIdToDelete : number = inject<number>(MAT_DIALOG_DATA);

  public onDeleteExpense() {

    this.expensesService.expenseDelete(this.expenseIdToDelete).subscribe(
      {
        next: (positiveResponse : PositiveResponseModel) => {
          this.toastrService.success("Expense Deleted Successfully","Success");
        },
        error: (errorResponse: Error) => {
          this.toastrService.error("Error deleting Expense","Error");
          console.error(errorResponse);
        }
      }
    )
  }

}
