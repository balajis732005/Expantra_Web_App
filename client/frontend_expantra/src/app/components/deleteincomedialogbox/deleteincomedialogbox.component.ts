import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {IncomeService} from "../../services/income/income.service";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";

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
  ) {
  }

  incomeIdToDelete : number = inject<number>(MAT_DIALOG_DATA);

  public onDeleteIncome() {

    this.incomeService.incomeDelete(this.incomeIdToDelete).subscribe(
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
