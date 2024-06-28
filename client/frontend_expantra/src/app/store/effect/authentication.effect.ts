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

@Injectable()

export class AuthenticationEffect {

  constructor(
    private actions$ : Actions,
    private authenticationService : AuthenticateService,
    private router : Router
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
              return AuthenticationFailAction({errorMessage : "AuthenticationFail Due to Data Null"});
            }
          }),
          catchError((errorResponse) => {
            return of(AuthenticationFailAction({errorMessage : errorResponse.message}));
          })
        )
      )
    )
  );

}
