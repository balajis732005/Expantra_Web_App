import {createReducer, on} from "@ngrx/store";
import {
  AuthenticationAction,
  AuthenticationFailAction,
  AuthenticationSuccessAction
} from "../action/authentication.action";
import {UserDetailsModel} from "../../models/userDetails.model";
import {UpdateAction, UpdateFailAction, UpdateSuccessAction} from "../action/update.action";

export const userDetails : UserDetailsModel = {
  userId : -1,
  firstName : "",
  lastName : "",
  gender : "",
  age : -1,
  mobileNumber : "",
  email : "",
  role : "",
  errorMessage : ""
}

const _userDetailsReducer = createReducer(userDetails,

  on(AuthenticationAction, (state, action) => {
    return {
      ...state,
      ...action
    }
  }),

  on(AuthenticationSuccessAction, (state, action) => {
    return {
      ...state,
      userId : action.userId,
      firstName : action.firstName,
      lastName : action.lastName,
      gender : action.gender,
      age : action.age,
      mobileNumber : action.mobileNumber,
      email : action.email,
      role : action.role,
    }
  }),

  on(AuthenticationFailAction, (state, action) => {
    return {
      ...state,
      errorMessage : action.errorMessage
    }
  }),

  on(UpdateAction, (state, action) => {
    return {
      ...state,
      ...action
    }
  }),

  on(UpdateSuccessAction, (state, action) => {
    return {
      ...state,
      firstName: action.firstName,
      lastName: action.lastName,
      gender: action.gender,
      mobileNumber: action.mobileNumber,
      email: action.email,
    }
  }),

  on(UpdateFailAction, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage
    }
  })

)

export function userDetailsReducer(state : any, action : any) : any {
  return _userDetailsReducer(state, action);
}
