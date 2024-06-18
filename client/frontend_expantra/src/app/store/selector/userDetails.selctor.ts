import {createSelector} from "@ngrx/store";
import {AppState} from "../state/app.state";

export const userDetailsSelector = createSelector(
  (state:AppState) => state.userDetails,
  userDetails => userDetails
);
