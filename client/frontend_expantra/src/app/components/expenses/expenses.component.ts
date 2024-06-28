import {Component, Inject, OnInit, PLATFORM_ID, ViewChild, viewChild} from '@angular/core';
import {ExpensesService} from "../../services/expenses/expenses.service";
import {ExpensesReadResponseModel} from "../../models/ExpensesReadResponse.model";
import {userDetailsSelector} from "../../store/selector/userDetails.selctor";
import {UserDetailsModel} from "../../models/userDetails.model";
import {ExpensesReadRequestModel} from "../../models/ExpensesReadRequest.model";
import {AppState} from "../../store/state/app.state";
import {Store} from "@ngrx/store";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CreateexpensedialogboxComponent} from "../createexpensedialogbox/createexpensedialogbox.component";
import {UpdateexpensedialogboxComponent} from "../updateexpensedialogbox/updateexpensedialogbox.component";
import {DeleteexpensedialogboxComponent} from "../deleteexpensedialogbox/deleteexpensedialogbox.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NavbarComponent,
    NgIf
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit{

  displayExpanses : ExpensesReadResponseModel[] = [];

  constructor(
    private expensesService : ExpensesService,
    private store : Store<AppState>,
    public dialog: MatDialog,
    private toastrService : ToastrService
  ) {
  }

  filterSortForm = new FormGroup(
    {
      expenseSearch : new FormControl(""),
      sortBy : new FormControl(""),
      sortOrder : new FormControl(""),
      pastMonths : new FormControl(0),
    }
  )

  public onReadExpensesSubmit() {
    this.apiCall(true);
  }

  ngOnInit() {
    this.apiCall(false);
  }

  public apiCall(userReadExpense: boolean) {
    let idFromState : number = -1;
    let emailFromState : string = "";

    this.store.select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        console.log(userDetails);
        idFromState=userDetails.userId;
        emailFromState=userDetails.email;
      })
    let expensesReadUser : ExpensesReadRequestModel = {
      userId : idFromState,
      email : emailFromState,
      expenseSearchName : "",
      sortBy : "NAME",
      sortOrder : "ASC",
      past : 1
    }
    if(userReadExpense){
      expensesReadUser.expenseSearchName=this.filterSortForm.value.expenseSearch!;
      expensesReadUser.sortBy  = this.filterSortForm.value.sortBy!;
      expensesReadUser.sortOrder  = this.filterSortForm.value.sortOrder!;
      expensesReadUser.past = this.filterSortForm.value.pastMonths!;
    }

    this.expensesService.getExpenses(expensesReadUser).subscribe(
      {
        next: (userWantExpenses : ExpensesReadResponseModel[]) => {
          console.log("expenses : ",userWantExpenses)
          this.displayExpanses=userWantExpenses;
          this.toastrService.info("Click Submit Button to view Updated Expenses","Information");
        },
        error: (errorResponse) => {
          this.toastrService.error("Error of getting Expenses","Error");
          console.log(errorResponse);
        }
      }
    )
  }

  public onCreateNewExpense(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(CreateexpensedialogboxComponent, {
      width:"500px",
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  public onUpdateExpense(index : number,enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(UpdateexpensedialogboxComponent, {
      data : this.displayExpanses[index],
      width : '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  public onDeleteExpanse(index : number,enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DeleteexpensedialogboxComponent, {
      data : this.displayExpanses[index].expenseId,
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

}
