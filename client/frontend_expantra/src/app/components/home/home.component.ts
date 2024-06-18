import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {DialogboxdeleteComponent} from "../dialogboxdelete/dialogboxdelete.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {userDetailsSelector} from "../../store/selector/userDetails.selctor";
import {UserDetailsModel} from "../../models/userDetails.model";
import {NetamountService} from "../../services/netamount/netamount.service";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {NetAmountResponseModel} from "../../models/NetAmountResponseModel";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(
    public dialog: MatDialog,
    private store : Store<AppState>,
    private netAmountService : NetamountService
  ) {
  }

  netExpenses! : number;

  netIncome! : number;

  netSavings! : number;

  ngOnInit() {

    let idFromState : number=-1;

    this.store.select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        console.log(userDetails);
        idFromState=userDetails.userId;
      })

    this.netAmountService.getNetAmount(idFromState).subscribe(
      {
        next: (netAmountResponse : NetAmountResponseModel) => {
          this.netExpenses=netAmountResponse.netExpense;
          this.netIncome=netAmountResponse.netIncome;
          this.netSavings=this.netIncome-this.netExpenses;
        }
      }
    )
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogboxdeleteComponent, {
      width : '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

}
