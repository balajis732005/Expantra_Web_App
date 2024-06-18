import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticateRequestModel} from "../../models/AuthenticateRequest.model";
import {Observable} from "rxjs";
import {AuthenticationResponseModel} from "../../models/AuthenticationResponse.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private httpClient : HttpClient
  ) { }

  private authenticateApiUrl : string = "http://localhost:8080/expantra/authenticate";

  public authenticateUser(
    authenticationRequestModel : AuthenticateRequestModel
  ) : Observable<AuthenticationResponseModel> {
    return this.httpClient.post<AuthenticationResponseModel>(
      this.authenticateApiUrl, authenticationRequestModel);
  }

}
