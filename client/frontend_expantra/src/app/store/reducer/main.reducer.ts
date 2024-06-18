import {ActionReducer, ActionReducerMap, MetaReducer, State} from "@ngrx/store";
import {userDetailsReducer} from "./userDetails.reducer";
import {isDevMode} from "@angular/core";
import {AppState} from "../state/app.state";

export const reducers : ActionReducerMap<AppState> = {
  userDetails : userDetailsReducer
}

export const metaReducers : MetaReducer<AppState>[] = isDevMode() ? [debug] : []

export function debug(reducer : ActionReducer<AppState>) : ActionReducer<AppState> {
  return function (state,action) {
    console.log("state:",state);
    console.log("action:",action);
    return reducer(state,action);
  };
}
