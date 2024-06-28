import { Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthenticateService} from "../../services/Authenticate/authenticate.service";
import {
  AuthenticationAction,
  AuthenticationFailAction,
  AuthenticationSuccessAction
} from "../action/authentication.action";
import {catchError, map, mergeMap, of} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable()

export class AuthenticationEffect {

  constructor(
    private actions$ : Actions,
    private authenticationService : AuthenticateService,
    private router : Router,
    private toastrService : ToastrService
  ) { }

  authenticationEffect$  = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationAction),
      mergeMap((action) =>
        this.authenticationService.authenticateUser(action.authenticateRequest).pipe(
          map((authenticationResponseDto) => {
            console.log(authenticationResponseDto);
            if(authenticationResponseDto!=null){
              sessionStorage.setItem("jwtToken", authenticationResponseDto.jwtToken);
              this.toastrService.success("Authenticated successfully","Success");
              this.router.navigate(["/home"]).then(status => true);
              return AuthenticationSuccessAction({
                userId : authenticationResponseDto.userId,
                firstName : authenticationResponseDto.firstName,
                lastName : authenticationResponseDto.lastName,
                gender : authenticationResponseDto.gender,
                age : authenticationResponseDto.age,
                mobileNumber : authenticationResponseDto.mobileNumber,
                email : authenticationResponseDto.email,
                role : authenticationResponseDto.role
              });
            } else{
              this.toastrService.error("Authentication Failed","Error");
              return AuthenticationFailAction({errorMessage : "AuthenticationFail Due to Data Null"});
            }
          }),
          catchError((errorResponse) => {
            this.toastrService.error("Authentication Failed","Error");
            return of(AuthenticationFailAction({errorMessage : errorResponse.message}));
          })
        )
      )
    )
  );

}
