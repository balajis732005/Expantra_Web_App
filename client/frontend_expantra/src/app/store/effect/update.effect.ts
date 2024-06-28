import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UpdateAction, UpdateFailAction, UpdateSuccessAction} from "../action/update.action";
import {catchError, map, mergeMap, of} from "rxjs";
import {UpdateService} from "../../services/update/update.service";
import {ToastrService} from "ngx-toastr";

@Injectable()

export class UpdateEffect {

  constructor(
    private actions$ : Actions,
    private updateService : UpdateService,
    private toastrService: ToastrService,
  ) {}

  updateEffect$  = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateAction),
      mergeMap((action) =>
        this.updateService.updateUser(action.updateRequest).pipe(
          map((updateResponseDto) => {
            console.log(updateResponseDto);
            if(updateResponseDto!=null){
              this.toastrService.success("Details Updated Successfully","Success");
              return UpdateSuccessAction({
                firstName : updateResponseDto.firstName,
                lastName : updateResponseDto.lastName,
                gender : updateResponseDto.gender,
                mobileNumber : updateResponseDto.mobileNumber,
                email : updateResponseDto.email,
              })
            }else{
              this.toastrService.error("Update Details Failed","Error");
              return UpdateFailAction({
                errorMessage : "Update Fail Due to Some Issues"
              })
            }
          }),
          catchError((errorResponse) => {
            this.toastrService.error("Update Details Failed","Error");
            return of(UpdateFailAction({errorMessage : errorResponse.message}));
          })
        )
      )
    )
  );

}
