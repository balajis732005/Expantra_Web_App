import {Component, OnInit} from '@angular/core';
import {IncomeReadResponseModel} from "../../models/IncomeReadResponse.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {userDetailsSelector} from "../../store/selector/userDetails.selctor";
import {UserDetailsModel} from "../../models/userDetails.model";
import {IncomeReadRequestModel} from "../../models/IncomeReadRequest.model";
import {CreateincomedialogboxComponent} from "../createincomedialogbox/createincomedialogbox.component";
import {UpdateincomedialogboxComponent} from "../updateincomedialogbox/updateincomedialogbox.component";
import {DeleteincomedialogboxComponent} from "../deleteincomedialogbox/deleteincomedialogbox.component";
import {IncomeService} from "../../services/income/income.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit{

  displayIncome : IncomeReadResponseModel[] = [];

  constructor(
    private incomeService : IncomeService,
    private store : Store<AppState>,
    public dialog: MatDialog,
  ) {
  }

  filterSortForm = new FormGroup(
    {
      incomeSearch : new FormControl(""),
      sortBy : new FormControl(""),
      sortOrder : new FormControl(""),
      pastMonths : new FormControl(0),
    }
  )

  public onReadIncomeSubmit() {
    this.apiCall(true);
  }

  ngOnInit() {
    this.apiCall(false);
  }

  public apiCall(userReadIncome: boolean) {
    let idFromState : number = -1;
    let emailFromState : string = "";

    this.store.select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        console.log(userDetails);
        idFromState=userDetails.userId;
        emailFromState=userDetails.email;
      })
    let incomeReadUser : IncomeReadRequestModel = {
      userId : idFromState,
      email : emailFromState,
      incomeSearchName : "",
      sortBy : "NAME",
      sortOrder : "ASC",
      past : 1
    }
    if(userReadIncome){
      incomeReadUser.incomeSearchName=this.filterSortForm.value.incomeSearch!;
      incomeReadUser.sortBy  = this.filterSortForm.value.sortBy!;
      incomeReadUser.sortOrder  = this.filterSortForm.value.sortOrder!;
      incomeReadUser.past = this.filterSortForm.value.pastMonths!;
    }

    this.incomeService.getIncome(incomeReadUser).subscribe(
      {
        next: (userWantIncome : IncomeReadResponseModel[]) => {
          console.log("income : ",userWantIncome)
          this.displayIncome=userWantIncome;
        },
        error: (errorResponse) => {
          console.log(errorResponse);
        }
      }
    )
  }

  public onCreateNewIncome(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(CreateincomedialogboxComponent, {
      width : '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  public onUpdateIncome(index : number,enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(UpdateincomedialogboxComponent, {
      data : this.displayIncome[index],
      width : '1000px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  public onDeleteIncome(index : number,enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DeleteincomedialogboxComponent, {
      data : this.displayIncome[index].incomeId,
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

}
