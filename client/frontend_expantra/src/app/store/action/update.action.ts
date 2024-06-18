import {createAction, props} from "@ngrx/store";
import {UpdateRequestModel} from "../../models/UpdateRequestModel";

export const UpdateAction = createAction(
  "UpdateAction",
  props<{updateRequest : UpdateRequestModel}>()
);

export const UpdateSuccessAction = createAction(
  "UpdateSuccessAction",
  props<{
    firstName : string;
    lastName : string;
    gender : string;
    mobileNumber : string;
    email : string;
  }>()
);

export const UpdateFailAction = createAction(
  "UpdateFailAction",
  props<{ errorMessage : string }>()
);
