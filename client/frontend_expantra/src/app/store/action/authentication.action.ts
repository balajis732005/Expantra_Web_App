import {createAction, props} from "@ngrx/store";
import {AuthenticateRequestModel} from "../../models/AuthenticateRequest.model";
import {AuthenticationResponseModel} from "../../models/AuthenticationResponse.model";

export const AuthenticationAction = createAction(
  "AuthenticationAction",
  props<{ authenticateRequest : AuthenticateRequestModel }>()
);

export const AuthenticationSuccessAction = createAction(
  "AuthenticationSuccessAction",
  props<{
    userId : number;
    firstName : string;
    lastName : string;
    gender : string;
    age : number;
    mobileNumber : string;
    email : string;
    role : string;
  }>()
);

export const AuthenticationFailAction = createAction(
  "AuthenticationFailAction",
  props<{ errorMessage : string }>()
);
