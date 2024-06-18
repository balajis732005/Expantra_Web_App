import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {userDetailsSelector} from "../../store/selector/userDetails.selctor";
import {UserDetailsModel} from "../../models/userDetails.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {DeleteService} from "../../services/delete/delete.service";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialogboxdelete',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialogboxdelete.component.html',
  styleUrl: './dialogboxdelete.component.css'
})
export class DialogboxdeleteComponent {

  constructor(
    public dialogRef : MatDialogRef<DialogboxdeleteComponent>,
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
