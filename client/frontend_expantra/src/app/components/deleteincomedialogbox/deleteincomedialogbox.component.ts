import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {IncomeService} from "../../services/income/income.service";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-deleteincomedialogbox',
  standalone: true,
  imports: [
    MatDialogClose
  ],
  templateUrl: './deleteincomedialogbox.component.html',
  styleUrl: './deleteincomedialogbox.component.css'
})
export class DeleteincomedialogboxComponent {

  constructor(
    private incomeService : IncomeService,
    private toastrService : ToastrService
  ) {
  }

  incomeIdToDelete : number = inject<number>(MAT_DIALOG_DATA);

  public onDeleteIncome() {

    this.incomeService.incomeDelete(this.incomeIdToDelete).subscribe(
      {
        next: (positiveResponse : PositiveResponseModel) => {
          this.toastrService.success("Income Deleted Successfully","Success");
        },
        error: (errorResponse: Error) => {
          this.toastrService.error("Error deleting income","Error");
          console.error(errorResponse);
        }
      }
    )
  }

}
