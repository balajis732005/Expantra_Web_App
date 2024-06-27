import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {httpInterceptor} from "./interceptors/http.interceptor";
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import {AuthenticationEffect} from "./store/effect/authentication.effect";
import {metaReducers, reducers} from "./store/reducer/main.reducer";
import {UpdateEffect} from "./store/effect/update.effect";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([httpInterceptor]),withFetch()),
    provideStore(reducers,{metaReducers}),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([AuthenticationEffect,UpdateEffect]), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()
  ]
};
