import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ForgetPasswordEmailSendModel} from "../../models/ForgetPasswordEmailSend.model";
import {Observable} from "rxjs";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {VerificationRequestModel} from "../../models/VerificationRequest.model";
import {ResetPasswordModel} from "../../models/ResetPassword.model";

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(
    private httpClient : HttpClient,
  ) { }

  private forgetPasswordEmailApiUrl : string = "http://localhost:8080/expantra/forgetpassword/email";
  private forgetPasswordVerifyApiUrl : string = "http://localhost:8080/expantra/forgetpassword/verify";
  private passwordResetApiUrl : string = "http://localhost:8080/expantra/forgetpassword/newpassword";

  public forgetPasswordEmailSend(
    forgetPasswordEmailSend : ForgetPasswordEmailSendModel
  ) : Observable<PositiveResponseModel> {
    return this.httpClient.post<PositiveResponseModel>(this.forgetPasswordEmailApiUrl, forgetPasswordEmailSend );
  }

  public forgetPasswordVerify(
    verificationRequest : VerificationRequestModel
  ) : Observable<PositiveResponseModel> {
    return this.httpClient.post<PositiveResponseModel>(this.forgetPasswordVerifyApiUrl, verificationRequest);
  }

  public passwordReset(
    passwordReset : ResetPasswordModel
  ) : Observable<PositiveResponseModel> {
    return this.httpClient.post<PositiveResponseModel>(this.passwordResetApiUrl, passwordReset);
  }

}
