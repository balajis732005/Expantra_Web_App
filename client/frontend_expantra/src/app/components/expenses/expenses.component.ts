import {Component, Inject, OnInit, PLATFORM_ID, ViewChild, viewChild} from '@angular/core';
import {ExpensesService} from "../../services/expenses/expenses.service";
import {ExpensesReadResponseModel} from "../../models/ExpensesReadResponse.model";
import {userDetailsSelector} from "../../store/selector/userDetails.selctor";
import {UserDetailsModel} from "../../models/userDetails.model";
import {ExpensesReadRequestModel} from "../../models/ExpensesReadRequest.model";
import {AppState} from "../../store/state/app.state";
import {Store} from "@ngrx/store";
import {isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CreateexpensedialogboxComponent} from "../createexpensedialogbox/createexpensedialogbox.component";
import {UpdateexpensedialogboxComponent} from "../updateexpensedialogbox/updateexpensedialogbox.component";
import {DeleteexpensedialogboxComponent} from "../deleteexpensedialogbox/deleteexpensedialogbox.component";
import {NavbarComponent} from "../navbar/navbar.component";

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

  displayExpanses : ExpensesReadResponseModel[] = [
    {
      "expenseId": 4,
      "expenseName": "GAAocery",
      "expenseDescription": "For opening of school after Long Time so new things to buy Groocery",
      "expenseCategory": "Groocery",
      "expenseAmount": 5890.0,
      "expenseCreatedBy": "MySON",
      "expenseCreatedDate": "Fri, Jun 14 2024 15:19:10",
      "expenseLastModifiedDate": ""
    },
    {
      "expenseId": 7,
      "expenseName": "GAAocery",
      "expenseDescription": "For opening of school after Long Time so new things to buy Groocery",
      "expenseCategory": "Groocery",
      "expenseAmount": 5890.0,
      "expenseCreatedBy": "MySON",
      "expenseCreatedDate": "Fri, Jun 14 2024 15:19:29",
      "expenseLastModifiedDate": ""
    },
    {
      "expenseId": 6,
      "expenseName": "GBAocery",
      "expenseDescription": "For opening of school after Long Time so new things to buy Groocery",
      "expenseCategory": "Groocery",
      "expenseAmount": 5890.0,
      "expenseCreatedBy": "MySON",
      "expenseCreatedDate": "Fri, Jun 14 2024 15:19:21",
      "expenseLastModifiedDate": ""
    },
    {
      "expenseId": 5,
      "expenseName": "GBBocery",
      "expenseDescription": "For opening of school after Long Time so new things to buy Groocery",
      "expenseCategory": "Groocery",
      "expenseAmount": 5890.0,
      "expenseCreatedBy": "MySON",
      "expenseCreatedDate": "Fri, Jun 14 2024 15:19:16",
      "expenseLastModifiedDate": ""
    },
    {
      "expenseId": 3,
      "expenseName": "Groocery",
      "expenseDescription": "For opening of school after Long Time so new things to buy Groocery",
      "expenseCategory": "Groocery",
      "expenseAmount": 5890.0,
      "expenseCreatedBy": "MySON",
      "expenseCreatedDate": "Fri, Jun 14 2024 15:19:02",
      "expenseLastModifiedDate": ""
    },
    {
      "expenseId": 9,
      "expenseName": "SABdy",
      "expenseDescription": "For opening of school after Long Time so new things to buy GBBAocery",
      "expenseCategory": "Groocery",
      "expenseAmount": 5890.0,
      "expenseCreatedBy": "MySON",
      "expenseCreatedDate": "Fri, Jun 14 2024 15:19:53",
      "expenseLastModifiedDate": ""
    },
    {
      "expenseId": 2,
      "expenseName": "SAudy",
      "expenseDescription": "For opening of school after Long Time so new things to buy Study",
      "expenseCategory": "Stationay Study",
      "expenseAmount": 5567.0,
      "expenseCreatedBy": "MySON",
      "expenseCreatedDate": "Fri, Jun 14 2024 15:18:26",
      "expenseLastModifiedDate": ""
    },
    {
      "expenseId": 8,
      "expenseName": "SBBdy",
      "expenseDescription": "For opening of school after Long Time so new things to buy GBBAocery",
      "expenseCategory": "Groocery",
      "expenseAmount": 5890.0,
      "expenseCreatedBy": "MySON",
      "expenseCreatedDate": "Fri, Jun 14 2024 15:19:47",
      "expenseLastModifiedDate": ""
    },
    {
      "expenseId": 1,
      "expenseName": "Study",
      "expenseDescription": "For opening of school after Long Time so new things to buy Study",
      "expenseCategory": "Stationay Study",
      "expenseAmount": 550.0,
      "expenseCreatedBy": "MySON",
      "expenseCreatedDate": "Fri, Jun 14 2024 15:18:01",
      "expenseLastModifiedDate": ""
    }
  ];

  constructor(
    private expensesService : ExpensesService,
    private store : Store<AppState>,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
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
    //this.apiCall(false);
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
        },
        error: (errorResponse) => {
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
