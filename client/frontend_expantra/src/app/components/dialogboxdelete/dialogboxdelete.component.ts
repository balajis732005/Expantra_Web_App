import { Component } from '@angular/core';
import {userDetailsSelector} from "../../store/selector/userDetails.selctor";
import {UserDetailsModel} from "../../models/userDetails.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {DeleteService} from "../../services/delete/delete.service";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {Router} from "@angular/router";
import {MatDialogClose} from "@angular/material/dialog";

@Component({
  selector: 'app-dialogboxdelete',
  standalone: true,
  imports: [
    MatDialogClose
  ],
  templateUrl: './dialogboxdelete.component.html',
  styleUrl: './dialogboxdelete.component.css'
})
export class DialogboxdeleteComponent {

  constructor(
    private store : Store<AppState>,
    private deleteService : DeleteService,
    private router : Router
  ) {
  }

  public onDelete() {

    let idFromState : number=-1;

    this.store.select(userDetailsSelector)
      .subscribe((userDetails: UserDetailsModel) => {
        console.log(userDetails);
        idFromState=userDetails.userId;
      })

    this.deleteService.deleteUser(idFromState).subscribe(
      {
        next: (positiveResponseDto : PositiveResponseModel) => {
          this.router.navigate(['']).then(status => true);
        },
        error : (error : Error) => {
          console.log(error);
        }
      }
    )

  }

}
