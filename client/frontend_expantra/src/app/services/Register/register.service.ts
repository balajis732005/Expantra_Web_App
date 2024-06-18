import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterRequestModel} from "../../models/RegisterRequest.model";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {VerificationRequestModel} from "../../models/VerificationRequest.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  private registerApiUrl : string = "http://localhost:8080/expantra/register";

  public registerUser(
    registerRequestModel : RegisterRequestModel
  ) : Observable<PositiveResponseModel> {
    return this.httpClient.post<PositiveResponseModel>(
      this.registerApiUrl, registerRequestModel);
  }

  private registerVerifyApiUrl : string = "http://localhost:8080/expantra/verify";

  public verifyRegisterActivationCode(
    verificationRequest : VerificationRequestModel
  ) : Observable<PositiveResponseModel> {
    return this.httpClient.post<PositiveResponseModel>(
      this.registerVerifyApiUrl, verificationRequest);
  }

}
